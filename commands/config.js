exports.run = (client, message, args, Discord, sql) => {
  var guild = message.guild;
  var serverid = guild.id;

  if(message.author.id != "213040107278696450"){return message.channel.send("This is a development feature and cannot be accessed by you at this time.")}

  sql.get(`SELECT * FROM channels WHERE serverid = "${serverid}"`).then(row => {
    if(!row){
      return message.channel.send("There is no log channel for this server. Please set one up and edit the channel topic.");
    }else{
      var logchannel = message.guild.channels.get(row.channelid);
      var topicString = logchannel.topic;

      if(!topicString){
        return message.channel.send("There is no config information to be displayed. Please set up config information in the topic of the log channel.");
      }

      const embed = new Discord.RichEmbed()
      .addField("Config Values", topicString);

      logchannel.send({embed});

      let configuration = topicString.split(";");
      logchannel.send(configuration[1])
    }
  }).catch(console.log);
}

/*
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
    for (i = 0; i < configuration.length; i++){
      if(configuration[i] == command){
        return message.channel.send("This command has been disabled on this server by an administrator. DM them if you think this is an error.")
        break;
      }else{
        commandFile.run(client, message, args, Discord, sql, guild);
      }
    }
  }
})
*/
