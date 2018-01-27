exports.run = (client, message, args, Discord) => {
  var commands = require("../commands.json");
  var commandName = args[0];

  var aliases = ""
  if(!commands[commandName].alias){
    aliases = "None"
  }else{
    aliases = commands[commandName].alias.split(" ").join(", ")
  }
    if(commandName){
      const embed = new Discord.RichEmbed()
        .setAuthor(`Info for ${commandName}`)
        .addField("Aliases", aliases, true)
        .addField("Usage", commands[commandName].usage, true)
        .addField("Description", commands[commandName].description, true)
        .addField("Permissions", commands[commandName].permission, true)
        .setColor(message.guild.member(client.user).highestRole.color)
        .setTimestamp(message.createdAt);

        message.channel.send({embed});
    }else{
      const embed = new Discord.RichEmbed()
        .setAuthor('Help for Shade', 'https://github.com/VeraxonHD/eos-modbot/wiki/Commands-and-their-uses')
        .setColor(message.guild.member(client.user).highestRole.color)
        .setTimestamp(message.createdAt)
        .addField("List of Commands can be found here", "http://veraxonhd.me/eos-commands.html");

        message.channel.send({embed});
    }


}
