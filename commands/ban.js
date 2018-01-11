exports.run = (client, message, args, Discord, sql) => {
  var react = require("../eos.js")
  var guild = message.guild
  //The targeted channel (aka mod log channel)
  //the user to be banned
  var banneduser = message.mentions.users.first()
  //saves the ban perms in a compact variable
  let banPerms = message.channel.guild.member(client.user.id).hasPermission("BAN_MEMBERS")

  if(!guild.members.get(message.author.id).hasPermission("BAN_MEMBERS")){return react.noPermReact()};

  //if the bot doesn't have the permissions
  if(!banPerms){return react.noPermReact()
  }else{
      //if the user is bannable
      if (message.mentions.users.first().bannable = true){
        //send the confirmation message, add a react and ban the user
        if (args.length >= 2){
        message.guild.member(banneduser).ban()
        .then(message.channel.send("Shade \`Success`\ - User banned successfully.")
        .then(message=>message.react('✅')));
        //builds the embed for the log channelOh
        const embed = new Discord.RichEmbed()
          .setColor(message.guild.member(client.user).highestRole.color)
          .setTimestamp(message.createdAt)
          .addField("User Banned: ", banneduser, true)
          .addField("Banned By: ", message.author.username, true)
          .addField("Reason: ", args.slice(1).join(" "), true)
          .setFooter("Automated Mod Logging");
          //sends the embed

          const config = require ("../config.json")
          const logchannel = message.guild.channels.get(config[guild.id].modlogchannelID)
          if(!logchannel){
            logchannel = message.guild.channels.get(config[guild.id].logchannelID)
          }
          logchannel.send({embed}).catch(console.log)

        }else{
          message.reply("Shade \`Error`\ - You must add a reason!")
          .then(message=>message.react('❎'));
      }
    }
  }
}
