exports.run = (client, message, args, Discord) => {
var react = require("../eos.js")
var guild = message.guild
var sql = require("sqlite")
sql.open('./tags.sqlite');

  if (args[0] == "create") {
    var commandname = args[1]
    if(!guild.members.get(message.author.id).hasPermission("MANAGE_MESSAGES")){return react.noPermReact()}
    sql.get(`SELECT * FROM tags WHERE commandname ='${commandname}'`).then(row => {
       if (!row) {
         sql.run('INSERT INTO tags (commandname, action) VALUES (?, ?)', [commandname, args.slice(2).join(" ")]);
         message.channel.send(`Eos \`Success\` - Command ${commandname} created!`)
             .then(message=>message.react('✅'))
       } else {
         message.channel.send("Eos \`Error`\ - That command already exists!")
             .then(message=>message.react('❎'));
       }
     }).catch((err) => {
       console.error(err);
       sql.run('CREATE TABLE IF NOT EXISTS tags (commandname TEXT, action TEXT)').then(() => {
         sql.run('INSERT INTO tags (commandname, action) VALUES (?, ?)', [commandname, args.slice(2).join(" ")]);

         message.channel.send(`Eos \`Success\` - Command ${commandname} created!`)
             .then(message=>message.react('✅'))
       });
     });

  }else if (args[0] == "delete") {
    if(!guild.members.get(message.author.id).hasPermission("MANAGE_MESSAGES")){return react.noPermReact()}
    var commandname = args[1]
    sql.get(`SELECT * FROM tags WHERE commandname = '${commandname}'`).then(row =>{
      if (!row){
        return;
        message.channel.send("Eos \`Error`\ - That command does not exist!")
          .then(message=>message.react('❎'))
          return;
      }
      sql.run(`DELETE FROM tags WHERE commandname = "${row.commandname}"`)})
      message.channel.send(`Eos \`Success\` - Command ${commandname} deleted`)
          .then(message=>message.react('✅'))

    .catch((err) => {
      console.error(err)
      message.channel.send("Error - Something happened but I'm too lazy to put a command thing cos the rest isn't even finished yet.")})

  }else{
    var commandname = args[0]
    sql.get(`SELECT * FROM tags WHERE commandname = '${commandname}'`).then(row =>{
      if (!row) return message.channel.send("Eos \`Error`\ - That command does not exist!")
          .then(message=>message.react('❎'));
      message.channel.send(`Tag \`${commandname}\` - ${row.action}`)
    }).catch((err) => {
      console.error(err)
      message.channel.send("Error - Something happened but I'm too lazy to put a command thing cos the rest isn't even finished yet.")
    });
  }
}
