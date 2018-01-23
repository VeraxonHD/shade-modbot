exports.run = (client, message, args, Discord) => {
  var tdGuild = client.guilds.find("id", "137719638556540929");
  var content = args.slice(0).join(" ");
  var target = tdGuild.members.get(message.channel.topic);
  var dateformat = require("dateformat");

  target.send(`**[${dateformat(new Date(), "HH:MM:ss")}] <${message.author.tag}>** - ${content}`);
  message.delete();
  message.channel.send(`**[${dateformat(new Date(), "HH:MM:ss")}] <${message.author.tag}>** - ${content}`);
}
