exports.run = (client, message, args, Discord) => {
  const embed = new Discord.RichEmbed()
    .setAuthor('Help for Eos', 'https://github.com/VeraxonHD/eos-modbot/wiki/Commands-and-their-uses')
    .setColor(message.guild.member(client.user).highestRole.color)
    .setTimestamp(message.createdAt)
    .addField("List of Commands can be found here", "http://veraxonhd.me/eos-commands.html");
    //sends the embed
    message.channel.send({embed})
}
