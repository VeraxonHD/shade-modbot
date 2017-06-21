const Discord = require("discord.js");
const client = new Discord.Client();
const cfg = require("./config.json");
const fs = require("fs");
const sql = require('sqlite');

//logs in using token
client.login(cfg.token);

//sends ready echo to console
client.on('ready', () => {
  console.log('Eos Booting. Started at ' + new Date());
  console.log("Prefix is: " + cfg.prefix)
  sql.open('eos-database.sqlite');
  console.log("Databases opened")
  console.log("Eos is R E A D Y. Ended at " + new Date())
});

client.on("guildMemberRemove", member => {
  const embed = new Discord.RichEmbed()
  let guild = member.guild

  //guild.defaultChannel.send(`Eos \`Info\` - User ${member.user.username} has left ${member.guild.name}.`)
    embed.addField("User Left", member.user.username)
    embed.addField("User Discriminator", member.user.discriminator, true)
    embed.addField("User ID", member.user.id)
    embed.setTimestamp(new Date())
    embed.setColor(guild.member(client.user).highestRole.color)
    embed.setThumbnail(member.user.avatarURL)

  sql.get(`SELECT * FROM channels WHERE serverid = "${guild.id}"`).then(row => {
      var tgtchannel = guild.channels.get(row.channelid)
      tgtchannel.send({embed})
  }).catch(err => {
    console.log(err)
  })
})

client.on("guildMemberAdd", member => {
  const embed = new Discord.RichEmbed()
  let guild = member.guild
  const ruleschannel = guild.channels.find("name", "server-rules")

  //guild.defaultChannel.send(`Eos \`Info\` - User ${member.user.username} has joined ${member.guild.name}. Please read the ${ruleschannel}!`)
    embed.addField("User Joined", member.user.username, true)
    embed.addField("User Discriminator", member.user.discriminator, true)
    embed.addField("User ID", member.user.id)
    embed.addField("User account creation date", member.user.createdAt)
    embed.setTimestamp(new Date())
    embed.setColor(guild.member(client.user).highestRole.color)
    embed.setThumbnail(member.user.avatarURL)

    sql.get(`SELECT * FROM channels WHERE serverid = "${guild.id}"`).then(row => {
        var tgtchannel = guild.channels.get(row.channelid)
        tgtchannel.send({embed})
    }).catch(err => {
      console.log(err)
    })
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
  		embed.addField("Message Content", "None", false)
  	}else{
  		if(message.content.length >= 1023){
  			embed.addField("Message Content", "Too long to post", false)
  		}else{
  			embed.addField("Message Content", message.content, false)
  		}
  	}

    sql.get(`SELECT * FROM channels WHERE serverid = "${guild.id}"`).then(row => {
        var tgtchannel = guild.channels.get(row.channelid)
        tgtchannel.send({embed})
    }).catch(err => {
      console.log(err)
    })
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

    sql.get(`SELECT * FROM channels WHERE serverid = "${guild.id}"`).then(row => {
        var tgtchannel = guild.channels.get(row.channelid)
        tgtchannel.send({embed})
    }).catch(err => {
      console.log(err)
    })
})

//Starboard message reaction
client.on("messageReactionAdd", (messageReaction, user) =>{

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
          messageReaction.message.channel.send("The starboard has been disabled by an administrator. DM them if you think this is an error.")
          return;
        }else{
          //if(messageReaction.emoji.toString != "⭐"){return;}
          //if(messageReaction.me = true){return;}

          let msg = messageReaction.message;
          let guild = msg.guild;
          let userid = msg.author.id;
          let content = msg.content;
            if(!content){return;}
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
  if (!message.content.startsWith(cfg.prefix)) return
  let guild = message.guild
  //new tgtchannel finder here

  exports.noPermReact = () => {
    return message.channel.send(`Eos - \`Error\` - You do not have permission to perform that command.`)
      .then(message => message.react('❎'))
    };
  exports.successReact = () => {

  }

  let command = message.content.split(" ")[0];
  command = command.slice(cfg.prefix.length);

  let args = message.content.split(" ").slice(1);
  // The list of if/else is replaced with those simple 2 lines:

  try {
    let commandFile = require(`./commands/${command}.js`);

    var serverid = guild.id;

    sql.get(`SELECT * FROM channels WHERE serverid = "${serverid}"`).then(row => {
      if(!row){
        message.channel.send("There is no log channel for this server. Please set one up and edit the channel topic.");
      }else{
        var logchannel = message.guild.channels.get(row.channelid);
        var topicString = logchannel.topic;

        if(!topicString){
          message.channel.send("There is no config information to be displayed. Please set up config information in the topic of the log channel.");
        }

        let configuration = topicString.split(";");
          if(configuration.includes(command)){
            message.channel.send("This command has been disabled on this server by an administrator. DM them if you think this is an error.")
            return;
          }else{
            commandFile.run(client, message, args, Discord, sql, guild);
          }
        }
    })
    //commandFile.run(client, message, args, Discord, sql, guild);
  } catch (err) {
    console.error(err);
  }
});
process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n", err);
});
