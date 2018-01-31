exports.run = (client, message, args, Discord) => {
  const request = require("request")
  const cheerio = require('cheerio');
  var embed = new Discord.RichEmbed()

  //client.typing(...)
  function getText(children) {
      if (children.children) return getText(children.children);
      return children.map(c => {
          return c.children ? getText(c.children) : c.data;
      }).join('');
  }

  if (args.length < 1){return message.channel.send("Shade `Error` - you must provide a search term.")}

  message.channel.send("Shade `Info` - :arrows_counterclockwise: Searching for your query...")
  .then(
    request.get("https://google.com/search?client=chrime%rls=en&ie=UTF=9&oe=UTF-8&q=" + args.join("+"), (err, res, body) => {
    if (err || res.statusCode !== 200){
      message.channel.send(`Shade \`Error\` - ${res.statusCode}: ${res.statusMessage}`)
    }
    let $ = cheerio.load(body);
    var results = [];
            $('.g').each((i) => {
                results[i] = {};
            });
            $('.g>.r>a').each((i, e) => {
                var raw = e.attribs['href'];
                results[i]['link'] = raw.substr(7, raw.indexOf('&sa=U') - 7);
            });
            $('.g>.s>.st').each((i, e) => {
                results[i]['description'] = getText(e);
            });

            var output = results.filter(r => r.link && r.description)
                .slice(0, 3)
                .map(r => `${r.link}\n\t${r.description}\n`)
                .join('\n');

            //message.delete()

              embed.addField("Search Term", `${args.join(" ")}`, true)
              embed.addField("Requested by", `${message.author}`)
              embed.addField("Search Results", output, false)
              embed.setColor(message.guild.member(client.user).highestRole.color)

              message.channel.send({embed})
    }))
    //.catch(message.channel.send("Shade `Error` - An error occured. Your search returned too many results or did not return any.!")
    .catch(console.log)
    //.then(m => m.react("❎"));
}
