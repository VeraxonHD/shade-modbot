const Discord = require("discord.js");
const client = new Discord.Client();
const cfg = require("./config.json");
const fs = require("fs");
const sql = require('sqlite');

//logs in using token
client.login(cfg.token);

//sends ready echo to console
client.on('ready', () => {
  console.log('Eos Online.');
  console.log("Prefix is: " + cfg.prefix)
});

client.on("guildMemberRemove", member => {
  const embed = new Discord.RichEmbed()
  let guild = member.guild
  const tgtchannel = guild.channels.find('name', 'log-channel')


  guild.defaultChannel.sendMessage(`Eos \`Info\` - User ${member.user.username} has left ${member.guild.name}.`)
    embed.addField("User Left", member.user.username)
    embed.setTimestamp(new Date())
    embed.setColor(guild.member(client.user).highestRole.color)
    embed.setThumbnail(member.user.avatarURL)
  tgtchannel.sendEmbed(embed)
})

client.on("guildMemberAdd", member => {
  const embed = new Discord.RichEmbed()
  let guild = member.guild
  const ruleschannel = guild.channels.find("name", "server-rules")
  const tgtchannel = guild.channels.find('name', 'log-channel')

  guild.defaultChannel.sendMessage(`Eos \`Info\` - User ${member.user.username} has joined ${member.guild.name}. Please read the ${ruleschannel}!`)
    embed.addField("User Joined", member.user.username)
    embed.setTimestamp(new Date())
    embed.setColor(guild.member(client.user).highestRole.color)
    embed.setThumbnail(member.user.avatarURL)
  tgtchannel.sendEmbed(embed)
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
  sql.open("logchannels.sqlite")
  if (!message.content.startsWith(cfg.prefix)) return
  let guild = message.guild
  //new tgtchannel finder here

  exports.noPermReact = () => {
    return message.channel.sendMessage(`Eos - \`Error\` - You do not have permission to perform that command.`)
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
    commandFile.run(client, message, args, Discord, sql, guild);
  } catch (err) {
    console.error(err);
  }
});
process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});
