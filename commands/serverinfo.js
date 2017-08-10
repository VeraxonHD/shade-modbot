exports.run = (client, message, args, Discord) => {
  const guild = message.guild
  const embed = new Discord.RichEmbed()
    .setAuthor("Server Information for " + guild.name)
    .addField("Member Count", guild.memberCount + " members", true)
    .addField("Server Owner", guild.owner.user.tag, true)
    .addField("Server Region", guild.region, true)
    .addField("Created", guild.createdAt, true)
    .addField("Guild ID", guild.id)
    .setThumbnail(guild.iconurl)
    .setColor(message.guild.member(client.user).highestRole.color)

  message.channel.send({embed})
}
