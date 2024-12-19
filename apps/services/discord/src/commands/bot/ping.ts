import { Client, Message, TextChannel, DMChannel } from "discord.js";

export default {
    name: "ping",
    aliases: ["latency"],
    cat: "bot",
    run: async (
        client: Client,
        message: Message,
        args: string[],
        prefix: string
    ) => {
        const latencyMessage = `⏲️ | My Web Socket Latency is - \`${client.ws.ping}ms\``;

        if (message.channel instanceof TextChannel || message.channel instanceof DMChannel) {
            return message.channel.send(latencyMessage);
        }
    },
};
