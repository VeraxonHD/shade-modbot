exports.run = (client, message, args, Discord, sql) => {
var react = require("../eos.js")
const guild = message.guild
var target = message.mentions.users.first()
//const tgtchannel = message.guild.channels.find('name', 'log-channel')

if(!guild.members.get(message.author.id).hasPermission("KICK_MEMBERS")){return react.noPermReact()}
if(args.length >= 2){

sql.get(`SELECT * FROM warn WHERE target ='${target.id}'`).then(row => {
   if (!row) {
     sql.run('INSERT INTO warn (target, warnings) VALUES (?, ?)', [target.id, 1])
     .catch(console.log())

     message.channel.send(`Eos \`Success\` - User ${target.username}'s record created and warned.'!`)
         .then(message=>message.react('✅'))
   } else {
     sql.run(`UPDATE warn SET warnings ="${row.warnings + 1}" WHERE target ="${target.id}"`)
     .catch(console.log())

     message.channel.send(`Eos \`Success\` - User ${target.username} warned!`)
         .then(message=>message.react('✅'))
    if(row.warnings == 2){
      message.guild.member(target).kick()
      message.channel.send(`Eos \`Info\` - User ${target.username} was kicked for exceeding the Warn threshold`)
        .then(message=>message.react('ℹ️'));
        sql.get(`SELECT * FROM channels WHERE serverid = "${guild.id}"`).then(row => {
            var tgtchannel = message.guild.channels.get(row.channelid)
            tgtchannel.send(`Eos \`Info\` - User ${target.username} was kicked for exceeding the Warn threshold`)
            .then(message=>message.react('ℹ️'));
        }).catch(err => {
          console.log(err)
        })
      .catch(console.log())
    }
   }
 }).catch((err) => {
   console.error(err);
   sql.run('CREATE TABLE IF NOT EXISTS warn (target INTEGER, warnings INTEGER)').then((row => {
     sql.run('INSERT INTO warn (target, warnings) VALUES (?, ?)', [target.id, (row.warnings + 1)])
     .catch(console.log())

     message.channel.send(`Eos \`Success\` - User ${target.username} warned!`)
         .then(message=>message.react('✅'))
   })
 )});

 const embed = new Discord.RichEmbed()
  .setColor(message.guild.member(client.user).highestRole.color)
  .setTimestamp(message.createdAt)
  .addField("User Warned: ", target, true)
  .addField("Warned By: ", message.author.username, true)
  .addField("Reason: ", args.slice(1).join(" "), true)
  .setFooter("Automated Mod Logging");

  sql.get(`SELECT * FROM channels WHERE serverid = "${guild.id}"`).then(row => {
      var tgtchannel = message.guild.channels.get(row.channelid)
      tgtchannel.send({embed})
  }).catch(err => {
    console.log(err)
  })

}else{
  return message.reply("Eos \`Error`\ - You must add a reason!")
        .then(message=>message.react('❎'));
}}
