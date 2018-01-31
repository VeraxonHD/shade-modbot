exports.run = (client, message, args, Discord) => {
  require("babel-polyfill");

  if(message.author.id != "213040107278696450"){return message.channel.send("This is a development feature and cannot be accessed by you at this time.")}

  const numReacts = ["1⃣", "2⃣", "3⃣", "4⃣", "5⃣", "6⃣", "7⃣"]
  const embed = new Discord.RichEmbed()
    .setThumbnail(client.user.avatarURL)
    .addField("Shade Help GUI", "Select one of the emoji below to find information on a command!")
    .addField("Shade GitHub", "https://github.com/VeraxonHD/shade-modbot/")

  message.channel.send({embed})
    .then(m => {
      try {
        m.react("1⃣")
        .then(m.react("2⃣"))
        .then(m.react("3⃣"))
      } catch (err){
        console.log(err)
      }
    }).catch(
      console.log()
    )
}
