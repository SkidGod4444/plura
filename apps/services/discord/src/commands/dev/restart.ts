import { Client, Message, TextChannel, DMChannel, NewsChannel } from 'discord.js';

export default {
    name: 'restart',
    description: 'Restart the bot.',
    run: async (
        client: Client & { config: { owner: string[] } },
        message: Message
    ) => {
        const { author, channel } = message;

        // Check if the user is authorized
        if (!client.config.owner.includes(author.id)) {
            if (channel instanceof TextChannel || channel instanceof DMChannel || channel instanceof NewsChannel) {
                await channel.send('❌ You do not have permission to restart the bot.');
            }
            return;
        }

        if (!(channel instanceof TextChannel || channel instanceof DMChannel || channel instanceof NewsChannel)) {
            return;
        }

        // Send a message to inform the user
        const restartMessage = await channel.send('⏳ Restarting bot...');

        try {
            // Perform the restart
            await restartMessage.edit('✅ Bot is restarting...');

            process.exit(0);
        } catch (error) {
            console.error('Error while restarting bot:', error);
            if (restartMessage.editable) {
                await restartMessage.edit('❌ Failed to restart the bot. Check the logs for more details.');
            } else {
                await channel.send('❌ Failed to restart the bot. Check the logs for more details.');
            }
        }
    },
};
