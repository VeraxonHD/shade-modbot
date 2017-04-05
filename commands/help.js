exports.run = (client, message, args, Discord) => {
  const embed = new Discord.RichEmbed()
    .setAuthor('Help for Eos', 'https://github.com/VeraxonHD/eos-modbot/wiki/Commands-and-their-uses')
    .setColor(message.guild.member(client.user).highestRole.color)
    .setTimestamp(message.createdAt)
    .addField("Reload", "Reloads a command. Only accessable by the bot owner, Vex.", true)
    .addField("Ping", "Test to see if the bot is active.", true)
    .addField("Prune", "Prunes x amount of messages.\nRequires 'MANAGE_MESSAGES' permissions.", true)
    .addField("Ban", "Bans a user.\nRequires 'BAN_MEMBERS' permissions and a reason.", true)
    .addField("Kick", "Kicks a user.\nRequires 'KICK_MEMBERS' permissions and a reason.", true)
    .addField("Mute", "Mutes a user.\nRequires 'MANAGE_MESSAGES' permissions and a reason.", true)
    .addField("Warn", "Adds a warning to a user's file.\nRequires 'KICK_MEMBERS' permissions and a reason. 3 warns = auto-kick.", true)
    .addField("Tag", "Creates/Deletes/Views a tag.\nRequires 'MANAGE_MESSAGES' permissions to create/delete.\nUsage: !tag <create|delete|{tagname}> <tagname> {content}", true)
    .setFooter("For more help, see github wiki.");
    //sends the embed
    tgtchannel.sendEmbed(
      embed,
    {disableEveryone: true })
      .then(message=>message.react('ℹ️'));
}
