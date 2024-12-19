import { Client, Collection, EmbedBuilder, Partials, WebhookClient } from "discord.js";
import { AsciiTable3 } from 'ascii-table3';
import { readdirSync } from 'fs';
import { config } from "./configs/config";
import configJSON from "./configs/config.json";

export const CommandsTable = new AsciiTable3().setHeading("Message Commands", "Status");
export const EventsTable = new AsciiTable3().setHeading("Client Events", "Status");

const client = new Client({
    intents: [
        "Guilds",
        "GuildMembers",
        "GuildMessages",
        "GuildInvites",
        "GuildEmojisAndStickers",
        "GuildBans",
        "GuildWebhooks",
        "GuildPresences",
        "MessageContent"
    ],
    allowedMentions: {
        repliedUser: true,
        parse: ["everyone", "roles", "users"]
    },
    partials: [
        Partials.User, Partials.Channel, Partials.GuildMember, 
        Partials.Message, Partials.Reaction, Partials.GuildScheduledEvent, Partials.ThreadMember
    ],
});

client.commands = new Collection();
client.config = configJSON;

export const loadCommands = (client: Client) => {
    readdirSync("./src/commands/").forEach(d => {
        const commandFiles = readdirSync(`./src/commands/${d}`).filter(f => f.endsWith('.js') || f.endsWith('.ts'));
        for (const f of commandFiles) {
            try {
                const cmd = require(`../src/commands/${d}/${f}`).default; // Default export
                if (cmd?.name) {
                    client.commands.set(cmd.name, cmd);
                    CommandsTable.addRow(`${d}.${f.split(".")[0]}`, "✅");
                }
            } catch (err) {
                console.error(`Error loading command file ${f}:`, err);
                CommandsTable.addRow(`${d}.${f.split(".")[0]}`, "❌");
            }
        }
    });
    setTimeout(() => {
        console.log(CommandsTable.toString());
    }, 3000 * readdirSync("./src/commands/").length);
};

export const loadEvents = (client: Client) => {
    readdirSync("./src/events/").forEach(d => {
        const eventFiles = readdirSync(`./src/events/${d}`).filter(f => f.endsWith('.js') || f.endsWith('.ts'));
        for (const f of eventFiles) {
            try {
                const event = require(`../src/events/${d}/${f}`).default; // Default export
                event(client);
                const eventName = `${d}.${f.split(".")[0]}`;
                EventsTable.addRow(eventName, "✅");
            } catch (err) {
                console.error(`Error loading event file ${f}:`, err);
                const eventName = `${d}.${f.split(".")[0]}`;
                EventsTable.addRow(eventName, "❌");
            }
        }
    });
    setTimeout(() => {
        console.log(EventsTable.toString());
    }, 3000 * readdirSync("./src/events/").length);
};

const webhook = new WebhookClient({ url: config.WEBHOOK_ERROR_LOGGING });

process.on("unhandledRejection", (err) => {
    console.error(err);
    webhook.send({ embeds: [new EmbedBuilder().setColor(`#2f3136`).setDescription(`\`\`\`ts\n${err}\`\`\``)] });
});

process.on("uncaughtException", (er) => {
    console.error(er);
    webhook.send({ embeds: [new EmbedBuilder().setColor(`#2f3136`).setDescription(`\`\`\`ts\n${er}\`\`\``)] });
});
const start = async () => {
    loadCommands(client);
    loadEvents(client);
    client.login(config.DISCORD_TOKEN);
};

start();

export default client;
