const Discord = require("discord.js");
const client = new Discord.Client();
const cfg = require("./config.json");
const fs = require("fs");
const sql = require('sqlite');
sql.open('./tags.sqlite');

//logs in using token
client.login(cfg.token);

//sends ready echo to console
client.on('ready', () => {
  console.log('Eos Online.');
  console.log("Prefix is: " + cfg.prefix)
});

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
  const tgtchannel = guild.channels.find('name', 'log-channel')
  if(!tgtchannel){
    guild.createChannel("log-channel", "text", )
    .then(chanl => message.channel.sendMessage(`The target channel ${chanl} was created. Please set permissions as you wish.`))
  }

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
