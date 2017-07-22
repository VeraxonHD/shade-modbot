exports.run = (client, message, args, Discord) => {
  var chan = message.channel
  var guild = message.guild
  var userid = message.author.id
  var modname = guild.members.get(userid).displayName

  var react = require("../eos.js")
  if(!guild.members.get(message.author.id).hasPermission("MANAGE_MESSAGES")){return react.noPermReact()};

  /*chan.permissionOverwrites.find("role", "292941255976026114").then(role =>{
    chan.permissionOverwrites.delete(role)
  })*/

  chan.overwritePermissions(guild.id, {
    "SEND_MESSAGES" : true
  })
  chan.send("Riot Mode was disabled. Regular users are now able to chat here.")
}
