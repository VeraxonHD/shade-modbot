exports.run = (client, message, args, Discord) => {

  var dateformat = require("dateformat");
  var username = message.mentions.users.first();
  var userid = username.id;
  var guild = message.guild;
  var nickname = guild.members.get(userid).displayName;
  var joined = guild.members.get(userid).joinedTimestamp;
  var lastmessage = guild.members.get(userid).lastMessage;
  var warnings = require("../warnings.json");
  var moment = require("moment");

  var diff = moment(joined).toNow(true);

  if(!warnings[userid]){
    var warningCount = 0
  }else{
    var warningCount = warnings[userid]
  }

  if(args.length < 1){
    return message.channel.send("`User Error` - You must mention a user.");
  }

  var embed = new Discord.RichEmbed()
    .setColor(message.guild.member(client.user).highestRole.color)
    .setTimestamp(message.createdAt)
    .addField("User info for", username.tag, true)
    .addField("User ID", userid, true)
    .addField("Joined", `${dateformat(joined, "dd/mm/yyyy \nhh:MM:ss")} GMT **(${diff} ago)**`, true)
    .setFooter(`Requested by ${message.author.username}`)
    .addField("Warnings", warningCount, true)
    .setThumbnail(username.avatarURL);

  if(!lastmessage){
    embed.addField("Last Seen: ", "This user has either never sent a message, or the last message was sent before " + dateformat(client.readyAt, "dd/mm/yyyy, hh:MM:ss"), true);
  }else{
    embed.addField("Last Seen", "At: " + dateformat(lastmessage.createdAt, "dd/mm/yyyy, hh:MM:ss") + " GMT\n" + `In: #${lastmessage.channel.name}`, true);
  }

  message.channel.send({embed});
}
