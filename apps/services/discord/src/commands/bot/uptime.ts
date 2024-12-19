import { Client, Message, EmbedBuilder, TextChannel, ColorResolvable } from 'discord.js';
import moment from 'moment';

export default {
  name: 'uptime',
  aliases: ['upt'],
  category: 'bot',
  adminPermit: false,
  ownerPermit: false,
  run: async (
    client: Client & { config: {default_color : ColorResolvable} },
    message: Message,
    args: string[],
    prefix: string
  ) => {
    const uptimeDuration = moment.duration(client.uptime);
    const formattedUptime = uptimeDuration.humanize();
    const embed = new EmbedBuilder()
      .setColor(client.config.default_color)
      .setDescription(`⏲️ | My uptime: \`${formattedUptime}\``);

    if (message.channel instanceof TextChannel) {
      await message.channel.send({ embeds: [embed] });
    }
  },
};
