import { Client, Message, TextChannel, DMChannel, NewsChannel } from 'discord.js';
import { CommandsTable, EventsTable, loadCommands, loadEvents } from '../../main';

export default {
    name: 'reload',
    description: 'Reload all commands and events.',
    run: async (
        client: Client & { config: { owner: string[] }, commands: Map<string, any> },
        message: Message
    ) => {
        const { author, channel } = message;

        // Check if the user is authorized
        if (!client.config.owner.includes(author.id)) {
            if (channel instanceof TextChannel || channel instanceof DMChannel || channel instanceof NewsChannel) {
                await channel.send('❌ You do not have permission to reload commands and events.');
            }
            return;
        }

        if (!(channel instanceof TextChannel || channel instanceof DMChannel || channel instanceof NewsChannel)) {
            return;
        }

        const reloadMessage = await channel.send('Reloading commands and events...');

        try {

            client.commands.forEach((_, name) => {
                client.commands.delete(name);
                console.log(name, "delll")
            });

            Object.keys(require.cache).forEach((key) => {
                if (key.includes('/src/commands/') || key.includes('/src/events/')) {
                    delete require.cache[key];
                }
            });

            CommandsTable.clearRows();
            EventsTable.clearRows();

            loadCommands(client)
            loadEvents(client)

            await reloadMessage.edit('✅ Commands and events successfully reloaded!');
        } catch (error) {
            console.error('Error while reloading commands/events:', error);
            if (reloadMessage.editable) {
                await reloadMessage.edit('❌ Failed to reload commands and events. Check the logs for more details.');
            } else {
                await channel.send('❌ Failed to reload commands and events. Check the logs for more details.');
            }
        }
    },
};
