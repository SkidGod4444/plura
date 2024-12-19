import { Client, Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, TextChannel, DMChannel, ColorResolvable } from "discord.js";

export default {
    name: "support",
    aliases: ["sv"],
    cat: "bot",
    adminPermit: false,
    ownerPermit: false,
    run: async (
        client: Client & { config: { support_server_link: string, default_color : ColorResolvable } },
        message: Message,
        args: string[],
        prefix: string
    ) => {
        const embed = new EmbedBuilder()
            .setColor(client.config.default_color)
            .setDescription(
                `⭐ | Click [here](${client.config.support_server_link}) to join the support server.`
            );

        const button = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setLabel("Support")
                .setURL(client.config.support_server_link)
        );

        if (message.channel instanceof TextChannel || message.channel instanceof DMChannel) {
            return message.channel.send({ embeds: [embed], components: [button] });
        }
    },
};
