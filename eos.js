const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const sql = require('sqlite');
const prefix = (process.env.PREFIX)
const config = require("./config.json")

//logs in using token
client.login(process.env.TOKEN);

sql.open('eos-database.sqlite');
//sends ready echo to console
client.on('ready', () => {
  console.log("Prefix is: " + prefix)
  console.log("Shade is R E A D Y.")
  client.user.setUsername("Shade")
  .then(user => console.log("My name has changed to Shade."))
  .catch(console.error)
  client.user.setGame("!!help").catch(console.log)
});

client.on("guildMemberRemove", member => {
  const embed = new Discord.RichEmbed()
  let guild = member.guild

    embed.addField("User Left", member.user.username)
    embed.addField("User Discriminator", member.user.discriminator, true)
    embed.addField("User ID", member.user.id)
    embed.setTimestamp(new Date())
    embed.setColor(guild.member(client.user).highestRole.color)
    embed.setThumbnail(member.user.avatarURL)

    if(config[guild.id].disabledMisc.indexOf("memberLog") == -1){
      const joinLogChannel = guild.channels.get(config[guild.id].joinLogChannel)
      joinLogChannel.send(`${member.displayName} has left the server! Bye!`)
    }

    const logchannel = guild.channels.get(config[guild.id].logchannelID)
    logchannel.send({embed})
})

client.on("guildMemberAdd", member => {
  const embed = new Discord.RichEmbed()
  let guild = member.guild
  const ruleschannel = guild.channels.find("name", "server-rules")

    embed.addField("User Joined", member.user.username, true)
    embed.addField("User Discriminator", member.user.discriminator, true)
    embed.addField("User ID", member.user.id)
    embed.addField("User account creation date", member.user.createdAt)
    embed.setTimestamp(new Date())
    embed.setColor(guild.member(client.user).highestRole.color)
    embed.setThumbnail(member.user.avatarURL)

    const joinLogChannel = guild.channels.get(config[guild.id].joinLogChannel)
    if(config[guild.id].disabledMisc.indexOf("memberLog") == -1){
      joinLogChannel.send(`${member.displayName} has joined the server! Welcome!`)
    }


    const logchannel = guild.channels.get(config[guild.id].logchannelID)
    logchannel.send({embed})
})

client.on("messageDelete", message => {
  const guild = message.guild
  const embed = new Discord.RichEmbed()
    .setAuthor("Message Deleted")
    .addField("Message Author", `${message.author.username}#${message.author.discriminator}`, false)
    .setColor(guild.member(client.user).highestRole.color)
    .setThumbnail(message.author.avatarURL)
    .setTimestamp(new Date());

    if(!message.content){
  		return;
  	}else{
  		if(message.content.length >= 1023){
  			embed.addField("Message Content", "Too long to post", false)
  		}else{
  			embed.addField("Message Content", message.content, false)
  		}
  	}

    const logchannel = guild.channels.get(config[guild.id].logchannelID)
    logchannel.send({embed})
})

client.on("messageUpdate", (oldMessage, newMessage) => {
  if(oldMessage.content.length == 0){
    return;
  }else if(newMessage.content.length == 0){
    return;
  }
  const guild = newMessage.guild
  const embed = new Discord.RichEmbed()
    .setAuthor("Message Edited")
    .addField("Message Author", `${newMessage.author.username}#${newMessage.author.discriminator}`, false)
    .addField("Old Message Content", oldMessage.content, false)
    .addField("New Message Content", newMessage.content, false)
    .setColor(guild.member(client.user).highestRole.color)
    .setThumbnail(newMessage.author.avatarURL)
    .setTimestamp(new Date())

  const logchannel = guild.channels.get(config[guild.id].logchannelID)
  logchannel.send({embed})

})

client.on("voiceStateUpdate", (oldMember, newMember) => {
  var embed = new Discord.RichEmbed();
  var guild = oldMember.guild
  var user = newMember.nickname
  var voicelogchannel = guild.channels.get(config[guild.id].voicelogchannelid)
  if(!voicelogchannel){
    voicelogchannel = guild.channels.get(config[guild.id].logchannelID)
  }

  if(!user){
    user = newMember.user.username
  }

  if(!oldMember.voiceChannel){
    embed.addField("User joined a voice channel", `${user} joined ${newMember.voiceChannel.name}.`)
  }else if(!newMember.voiceChannel){
    embed.addField("User disconnected from voice channels", `${user} left ${oldMember.voiceChannel.name}.`)
  }else{
    embed.setAuthor(`${user} changed voice channels.`)
    embed.addField("Old channel", `${oldMember.voiceChannel.name}`)
    embed.addField("New channel", `${newMember.voiceChannel.name}`)
  }
  embed.setColor(newMember.guild.member(client.user).highestRole.color)
  embed.setTimestamp(newMember.createdAt)
  voicelogchannel.send({embed}).catch(console.log)
})
//Starboard message reaction
client.on("messageReactionAdd", (messageReaction, user) =>{

  if(messageReaction.emoji.toString != "⭐"){return;}

  var serverid = messageReaction.message.guild.id

  sql.get(`SELECT * FROM channels WHERE serverid = "${serverid}"`).then(row => {
    if(!row){
      message.channel.send("There is no log channel for this server. Please set one up and edit the channel topic.");
    }else{
      var logchannel = messageReaction.message.guild.channels.get(row.channelid);
      var topicString = logchannel.topic;

      if(!topicString){
        message.channel.send("There is no config information to be displayed. Please set up config information in the topic of the log channel.");
      }

      let configuration = topicString.split(";");
        if(configuration.includes("starboard")){
          //messageReaction.message.channel.send("The starboard has been disabled by an administrator. DM them if you think this is an error.")
          return;
        }else{
          //if(messageReaction.emoji.toString != "⭐"){return;}
          //if(messageReaction.me = true){return;}

          let msg = messageReaction.message;
          let guild = msg.guild;
          let userid = msg.author.id;
          let content = msg.content;
            if(!content){content = "No Content (Could be an image or an embed?)"}
          let starboardchan =  guild.channels.find("name", "starboard");
            if(!starboardchan){starboardchan = logchannel;}

          const embed = new Discord.RichEmbed()
            .setTimestamp(new Date())
            .setAuthor("New Starred Post")
            .addField(guild.members.get(userid).displayName, content)
            .setColor([255, 172, 51])

          starboardchan.send({embed})
          //console.log(embed.fields)
        }
      }
  })
})

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.on("message", message => {

  if(message.channel.type === "dm"){return;}

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let guild = message.guild

  const logchannel = message.guild.channels.get(config[guild.id].logchannelID)

  /*if ((client.user.id === message.author.id) && (message.channel.id != logchannel) && (config[guild.id].autoCleanUpBlacklist.indexOf(command) == -1) && message.content.indexOf("Tag Request") == -1){
    message.delete(15000).catch(console.log)
  }

  if (message.content.startsWith(prefix) && (command != "prune") && (command != "tag")) {
    message.delete(15000).catch(console.log)
  }
  */

  if (!message.content.startsWith(prefix)) return

  exports.noPermReact = () => {
    return message.channel.send(`Shade - \`Error\` - You do not have permission to perform that command.`)
      .then(message => message.react('❎'))
    };

  let args = message.content.split(" ").slice(1);

  try {
    let commandFile = require(`./commands/${command}.js`);
    var serverid = guild.id;

    if(config[guild.id].disabledCommands.indexOf(command) == -1){
      commandFile.run(client, message, args, Discord, sql, guild, command)
    }else{
      return(message.channel.send("This command has been disabled by a server administrator."))
    }
  } catch (err) {
    console.error(err);
  }
});

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n", err);
});
