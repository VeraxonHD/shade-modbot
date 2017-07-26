exports.run = (client, message, args, Discord) => {
var react = require("../eos.js")
var guild = message.guild;
if(!guild.members.get(message.author.id).hasPermission("MANAGE_MESSAGES") || message.author.id != "213040107278696450"){return react.noPermReact()};


var managerrole = guild.roles.find("name", "Poll Manager");

if(!managerrole){return message.channel.send("There is no Poll Manager Role. You must have one named Exactly 'Poll Manager' to use the bot.")}

if(!guild.members.get(message.author.id).roles.find("name", "Poll Manager")){return message.channel.send("You do not have permission to perform that command at this time.")}

const pollTime = args[1] * 1000
if(!pollTime){return message.channel.send(" Eos `Error` - You did not define a time. Please define a time **in seconds**.").then(m=>m.react("❎"))}

const pollThumb = args[2]

  const embed = new Discord.RichEmbed()
    .setColor(guild.member(client.user).highestRole.color)
    .addField("New Poll", `Poll will close in ${pollTime / 1000} seconds. Use the reactions below to vote.`)
    .addField("Name of Poll", args[0])

  if(typeof pollThumb != "undefined"){
    embed.setThumbnail(pollThumb)
  }

  const reacts = ["✅", "❎"];

  message.delete();

  message.channel.send({embed})
  .then(botmsg => {

      function reactFunc(param){
        botmsg.react(param);
      }

      for (i = 0; i < reacts.length; i++) {
        reactFunc(reacts[i]);
      }

    setTimeout(function finalize() {
      var tickCount = botmsg.reactions.get(encodeURIComponent('✅')).count;
      var crossCount = botmsg.reactions.get(encodeURIComponent('❎')).count;

      if(tickCount > crossCount){
        return message.channel.send("The ayes have it.");
      }else if(crossCount > tickCount){
        return message.channel.send("The nays have it.");
      }else{
        return message.channel.send("A majority was not reached in time.");
      }
      /*console.log(tickCount);
      console.log(crossCount);*/
    }, pollTime); //900000
  })
}
