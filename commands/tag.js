exports.run = (client, message, args, Discord, sql) => {

  if (args[0] == "create") {
    var commandname = args[1]
    sql.get(`SELECT * FROM tags WHERE commandname ='${commandname}'`).then(row => {
       if (!row) {
         sql.run('INSERT INTO tags (commandname, action) VALUES (?, ?)', [commandname, args[2]]);
       } else {
         message.channel.sendMessage("Eos \`Error`\ - That command already exists!")
             .then(message=>message.react('❎'));
       }
     }).catch((err) => {
       console.error(err);
       sql.run('CREATE TABLE IF NOT EXISTS tags (commandname TEXT, action TEXT)').then(() => {
         sql.run('INSERT INTO tags (commandname, action) VALUES (?, ?)', [commandname, args[2]]);
       });
     });

  }else if (args[0] == "delete") {
    var commandname = args[1]

/*  }else if (args[0] == "list"){
    var length = sql.all('SELECT * FROM tags')
      .then(rows =>
        for (var i < rows.length){
          console.log(sql.get(`SELECT * FROM tags WHERE ROW_NUMBER() = ${i} `))
        })
*/
  }else{
    var commandname = args[0]
    sql.get(`SELECT * FROM tags WHERE commandname = '${commandname}'`).then(row =>{
      if (!row) return message.channel.sendMessage("Eos \`Error`\ - That command does not exist!")
          .then(message=>message.react('❎'));
      message.channel.sendMessage(`Tag \`${commandname}\` - ${row.action}`)
    }).catch((err) => {
      console.error(err)
      message.sendMessage("Error - Something happened but I'm too lazy to put a command thing cos the rest isn't even finished yet.")
    });
  }
}
