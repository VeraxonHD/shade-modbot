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
        .then(message.channel.send("Shade \`Success`\ - User kicked successfully.")
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
          const config = require ("../config.json")
          const logchannel = message.guild.channels.get(config[guild.id].modlogchannelID)
          if(!logchannel || logchannel === "null"){
            logchannel = message.guild.channels.get(config[guild.id].logchannelID)
          }
          logchannel.send(`**Infraction for: **${kickeduser}`).catch(console.log)

        }else{
          message.reply("Shade \`Error`\ - You must add a reason!")
          .then(message=>message.react('❎'));
      }
    }
  }
}
