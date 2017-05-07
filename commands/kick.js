exports.run = (client, message, args, Discord, sql) => {
  var react = require("../eos.js")
  var guild = message.guild
  //The targeted channel (aka mod log channel)
  //const tgtchannel = message.guild.channels.find('name', 'log-channel')
  //the user to be kicked
  var kickeduser = message.mentions.users.first()
  //saves the kick perms in a compact variable
  let kickPerms = message.channel.guild.member(client.user.id).hasPermission("KICK_MEMBERS")

if(!guild.members.get(message.author.id).hasPermission("KICK_MEMBERS")){return react.noPermReact()}
  //if the bot doesn't have the permissions
  if(!kickPerms){return react.noPermReact()
  }else{
      //if the user is kickable
      if (message.mentions.users.first().kickable = true){
        //send the confirmation message, add a react and kick the user
        if (args.length >= 2){
        message.guild.member(kickeduser).kick()
        .then(message.channel.send("Eos \`Success`\ - User kicked successfully.")
        .then(message=>message.react('✅')));
        //builds the embed for the log channelOh
        const embed = new Discord.RichEmbed()
          .setColor(message.guild.member(client.user).highestRole.color)
          .setTimestamp(message.createdAt)
          .addField("User Kicked: ", kickeduser, true)
          .addField("Kicked By: ", message.author.username, true)
          .addField("Reason: ", args.slice(1).join(" "), true)
          .setFooter("Automated Mod Logging");
          //sends the embed
          sql.get(`SELECT * FROM channels WHERE serverid = "${guild.id}"`).then(row => {
              var tgtchannel = message.guild.channels.get(row.channelid)
              tgtchannel.send({embed})
          }).catch(err => {
            console.log(err)
          })

        }else{
          message.reply("Eos \`Error`\ - You must add a reason!")
          .then(message=>message.react('❎'));
      }
    }
  }
}
