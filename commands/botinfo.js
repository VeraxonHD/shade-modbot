exports.run = (client, message, args, Discord) => {

  const embed = new Discord.RichEmbed()
    .setAuthor("Information regarding Eos")
    .addField("GitHub Link", "https://github.com/veraxonhd/eos-modbot/", true)
    .addField("Creator", "VeraxonHD (Vex#8289)", true)
    .addField("Website Link", "http://veraxonhd.me/", true)
    .addField("Currently operating on", client.guilds.size + " guilds", true)
    //.addField("With a total member count of", client.users.size + " members cached", true)
    .setColor(message.guild.member(client.user).highestRole.color)

    message.channel.send({embed})
}
