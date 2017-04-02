exports.run = (client, message, args, Discord) => {
var react = require("../eos.js")
var sql = require("sqlite")
sql.open('./warn.sqlite');
const guild = message.guild
var target = message.mentions.users.first()

if(!guild.members.get(message.author.id).hasPermission("KICK_MEMBERS")){return react.noPermReact()}

sql.get(`SELECT * FROM warn WHERE target ='${target.id}'`).then(row => {
   if (!row) {
     sql.run('INSERT INTO warn (target, warnings) VALUES (?, ?)', [target.id, 1])
     .catch(console.log())

     message.channel.sendMessage(`Eos \`Success\` - User ${target.username}'s record created and warned.'!`)
         .then(message=>message.react('✅'))
   } else {
     sql.run(`UPDATE warn SET warnings ="${row.warnings + 1}" WHERE target ="${target.id}"`)
     .catch(console.log())

     message.channel.sendMessage(`Eos \`Success\` - User ${target.username} warned!`)
         .then(message=>message.react('✅'))
    if(row.warnings == 2){
      message.guild.member(target).kick()
      message.channel.sendMessage(`Eos \`Info\` - User ${target.username} was kicked for exceeding the Warn threshold`)
      .catch(console.log())
    }
   }
 }).catch((err) => {
   console.error(err);
   sql.run('CREATE TABLE IF NOT EXISTS warn (target INTEGER, warnings INTEGER)').then((row => {
     sql.run('INSERT INTO warn (target, warnings) VALUES (?, ?)', [target.id, (row.warnings + 1)])
     .catch(console.log())

     message.channel.sendMessage(`Eos \`Success\` - User ${target.username} warned!`)
         .then(message=>message.react('✅'))
   })
 )});

 const embed = new Discord.RichEmbed()
    .send
}
