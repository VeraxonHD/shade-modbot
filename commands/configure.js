exports.run = (client, message, args, Discord) => {
  var guild = message.guild;
  var config = require("../config.json");
  var jsonfile = require("jsonfile")

  if(!guild.members.get(message.author.id).hasPermission("ADMINISTRATOR")){
    return message.channel.send("`User Error` - You do not have permission to perform that command.");
  }else if(args.length >= 1){
      var convar = args[0];
      var data = args.slice(1).join(" ");

      if(!config[guild.id][convar]){
        return message.channel.send("`Shade Error` - This convar does not exist.");
      }else{
        config[guild.id][convar] = data;
        jsonfile.writeFile("./config.json", config, {spaces: 4}, function(error){
          if(!error){
            message.channel.send("`Shade Success` - Convar was updated successfully!")
          }else{
            message.channel.send("`Shade Error` - The convar did not get updated.")
          }
        })
      }
    }else{
      message.channel.send(`**This Server's Config:** \n ${JSON.stringify(config[guild.id], null, "\t")}`);
    }
  }
