exports.run = (client, message, args, Discord) => {
  var guild = message.guild
  var taglist = require("../tags.json")
  var fs = require("fs")
  var jsonfile = require("jsonfile")

  if(args[0] == "create"){
    var tagname = args[1]
    var tagcontent = args.slice(2).join(" ")

    if(tagname == "list"){return;}

    if(!tagname){
      message.channel.send("`User Error` - You must include a name for your custom command. Usage: `!!tag create <name> <content>`")
    }else if(!tagcontent){
      message.channel.send("`User Error` - You must include content for your custom command. Usage: `!!tag create <name> <content>`")
    }else if(!guild.members.get(message.author.id).hasPermission("MANAGE_MESSAGES")){
      message.channel.send("`User Permission Error` - You do not have access to the relevant permissions to use this command.")
    }else if(JSON.stringify(taglist[guild.id]).indexOf(tagname) != -1){
      message.channel.send("`Shade Error` - This custom command already exists. Please choose a unique name or type `!!tag list`")
    }else{
      /*var output = {
        [guild.id] : {
          [tagname] : tagcontent
        },
        taglist
      }
      */

      taglist[guild.id][tagname] = tagcontent
      jsonfile.writeFile("./tags.json", taglist, {spaces: 4}, function(error){
        if(!error){
          message.channel.send("`Shade Success` - Custom command was created successfully!")
        }else{
          message.channel.send("`Shade Error` - The command did not get created.")
        }
      })
      /*jsonfile.writeFile("./tags.json", output, {spaces: 2}, function(err){
        console.log(err);
      })
      */
    }

  }else if(args[0] == "delete"){
    var tagname = args[1]

    if(!tagname){
      message.channel.send("`User Error` - You must provide a name for the command you wish to remove.")
    }else if(!guild.members.get(message.author.id).hasPermission("MANAGE_MESSAGES")){
      message.channel.send("`User Permission Error` - You do not have access to the relevant permissions to use this command.")
    }else if(JSON.stringify(taglist[guild.id]).indexOf(tagname) == -1){
      message.channel.send("`Shade Error` - This custom command does not exist. Please choose a valid tag to delete.")
    }else{
      delete taglist[guild.id][tagname]
      jsonfile.writeFile("./tags.json", taglist, {spaces: 4}, function(error){
        if(!error){
          message.channel.send("`Shade Success` - Custom command was deleted successfully!")
        }else{
          message.channel.send("`Shade Error` - The command did not get deleted.")
        }
      })
    }
  }else if(args[0] == "list"){ //List all Tags
    message.channel.send(`**This Server's Custom Tags:** \n ${JSON.stringify(taglist[guild.id], null, "\t")}`)
    message.channel.send(`**Global Tags:** \n ${JSON.stringify(taglist.global, null, "\t")}`)
  }else{ //Display Tag
    var tagname = args[0].toString();

    if(JSON.stringify(taglist[guild.id]).indexOf(tagname) != -1){
      message.channel.send(`\`Tag Request\` - ${taglist[guild.id][tagname]}`)
    }else if(JSON.stringify(taglist.global).indexOf(tagname) != -1){
      message.channel.send(`\`Tag Request\` - ${taglist.global[tagname]}`)
    }else{
      message.channel.send("Shade `Error` - The tag you requested could not be found. Check `!!tag list`.")
    }
  }
}
