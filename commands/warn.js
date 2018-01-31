exports.run = (client, message, args, Discord) => {
  var warnings = require("../warnings.json");
  var config = require("../config.json");
  var jsonfile = require("jsonfile");
  var user = message.mentions.users.first();
  if(user.id == client.user.id){
    return message.channel.send("Stop! You violated the law! Pay the court a fine or serve your sentence! Your stolen goods are now forfeit. <https://www.youtube.com/watch?v=O2otihe65SI>")
  }
  var guild = message.guild;
  var logchannel = message.guild.channels.get(config[guild.id].modlogchannelID);
  var reason = args.slice(1).join(" ")
  if(!reason){
    reason = "No Reason"
  }

  if(!logchannel || logchannel === "null"){
    logchannel = message.guild.channels.get(config[guild.id].logchannelID);
  }

  if(!guild.members.get(message.author.id).hasPermission("BAN_MEMBERS")){
    return message.channel.send("`User Error` - You do not have permission to perform that command.")
  }else{
    if(args[0] === "reset"){
      delete warnings[user.id];
      message.channel.send("`Shade Success` - User's warnings reset.")
    }else{
      if(!warnings[user.id]){
        warnings[user.id] = 1;
      }else{
        warnings[user.id] = parseInt(warnings[user.id]) + 1;
      }

      message.channel.send("`Shade Success` - The user was warned successfully.");
      var embed = new Discord.RichEmbed()
        .setColor(message.guild.member(client.user).highestRole.color)
        .setTimestamp(message.createdAt)
        .addField("User Warned:", user)
        .addField("Warned By: ", message.author.username, true)
        .addField("Reason: ", reason, true)
        .addField("Current total warnings: ", warnings[user.id], true)
        .setFooter("Automated Mod Logging");
      logchannel.send(`**Infraction for:** ${user}`, {embed});

    }
  }
  jsonfile.writeFile("./warnings.json", warnings, {spaces: 4}, function(error){
    if(error) console.log(error);
  });
}
