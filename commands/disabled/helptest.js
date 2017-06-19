exports.run = (client, message, args, Discord) => {
  require("babel-polyfill");

  if(message.author.id != "213040107278696450"){return message.channel.send("This is a development feature and cannot be accessed by you at this time.")}

  const numReacts = ["1⃣", "2⃣", "3⃣", "4⃣", "5⃣", "6⃣", "7⃣"]
  const embed = new Discord.RichEmbed()
    .setThumbnail(client.user.avatarURL)
    .addField("Eos Help GUI", "Select one of the emoji below to find information on a command!")
    .addField("Eos GitHub", "https://github.com/VeraxonHD/eos-modbot/")

  message.channel.send({embed})
    .then(m => {

      async function numReactFunc(param){
        m.react(param)
      }

      for (i = 0; i < numReacts.length; i++) {
        await numReactFunc(numReacts[i])
      }
    })
}
