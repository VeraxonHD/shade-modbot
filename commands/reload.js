exports.run = (client, message, args, Discord, sql) => {
  const react = require("../eos.js")
  var guild = message.guild

  if(message.author.id !== "213040107278696450"){return react.noPermReact()
  }else{
  // deletes the cache of the command and then re-loads the code.
  delete require.cache[require.resolve(`./${args[0]}.js`)];
  //Sends the confirmation message and slaps a react on that a$$
  let executor = message.author
  if(args.length < 1){
    message.channel.sendMessage("Eos \`Error`\ - You must define a command to reload")
      .then(message=>message.react('❎'));
  }
  message.channel.sendMessage(`Eos \`Success\` - The command **${args[0]}** has been reloaded!`).catch(console.log)
  .then(message=>message.react('✅'));

  const embed = new Discord.RichEmbed()
    .addField("Command Reloaded", `${executor.username} reloaded "${args[0]}"`)
    .setColor(message.guild.member(client.user).highestRole.color);


    sql.get(`SELECT * FROM channels WHERE serverid = "${guild.id}"`).then(row => {
        var tgtchannel = message.guild.channels.get(row.channelid)
        tgtchannel.sendEmbed(
          embed,
        {disableEveryone: true })
    }).catch(err => {
      console.log(err)
    })

}};
