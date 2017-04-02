exports.run = (client, message, args, Discord, sql) => {
var react = require("../eos.js")
const guild = message.guild
var target = message.mentions.users.first()

if(!guild.members.get(message.author).hasPermission("KICK_MEMBERS")){return react.noPermReact()}

sql.get(`SELECT * FROM mute WHERE target ='${target.id}'`).then(row => {
   if (!row) {
     sql.run('INSERT INTO tags (target, warnings) VALUES (?, ?)', [target, 1]);
     message.channel.sendMessage(`Eos \`Success\` - User ${target.nickname}'s record created and warned.'!`)
         .then(message=>message.react('✅'))
   } else {
     sql.run('INSERT INTO tags (target, warnings) VALUES (?, ?)', [target, (row.warnings + 1)]);
     message.channel.sendMessage(`Eos \`Success\` - User ${target.id} warned!`)
         .then(message=>message.react('✅'))
    if(row.warnings == 3){
      message.channel.sendMessage("threshold met")
    }
   }
 }).catch((err) => {
   console.error(err);
   sql.run('CREATE TABLE IF NOT EXISTS tags (target TEXT, warnings INTEGER)').then(() => {
     sql.run('INSERT INTO tags (target, warnings) VALUES (?, ?)', [target, (row.warnings + 1)]);

     message.channel.sendMessage(`Eos \`Success\` - Command ${commandname} created!`)
         .then(message=>message.react('✅'))
   });
 });

}
