const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
var fs = require('fs');
const client = new Discord.Client();
var list = fs.readdirSync('C:/Users/noobl/Desktop/BoopBot/storage/blacklist')
let commands = {};
let files = fs.readdirSync('./commands');
for (let f = 0; f < files.length; f++) {
  let commandName = files[f].split('.js')[0]; // removes the .js from the file name and stores that in this variable
  commands[commandName] = require(`./commands/${files[f]}`); // commands.boop for example would be equal to the module.exports defined in that file
}
client.on('message', function(message) {
  client.user.setActivity('with the power of boop.');
  var tracker = JSON.parse(fs.readFileSync('C:/Users/noobl/Desktop/BoopBot/storage/expstorage.json'))
  if (!tracker[message.author.id]) {tracker[message.author.id] = 0}
  tracker[message.author.id] += 100
  fs.writeFileSync(`C:/Users/noobl/Desktop/BoopBot/storage/expstorage.json`, JSON.stringify(tracker));
  if (message.content.startsWith(prefix)) {
    let commandWithPrefix = message.content.split(' ')[0]; // gets the command name + prefix from the message
    let commandWithoutPrefix = commandWithPrefix.substring(prefix.length); // removes the prefix
    if (commands[commandWithoutPrefix]) {
      var stuff = JSON.parse(fs.readFileSync(`C:/Users/noobl/Desktop/BoopBot/storage/blacklist/${commandWithoutPrefix}.json`))
      var universe = JSON.parse(fs.readFileSync(`C:/Users/noobl/Desktop/BoopBot/storage/blacklist/universal.json`))
      if (universe.blacklist.includes(message.author.id)) {
        message.channel.send("You have been banned from using this bot.")
      }
      else {
      if (stuff.blacklist.includes(message.author.id)) {
        message.channel.send("You are blacklisted from using this command.")
      }
      else {
      commands[commandWithoutPrefix].function(message);
    }
  }
}
    else {
      message.channel.send("That command doesn't exist, use ``b>help`` for a list of commands.");
    }
  }
});
client.login("lol I'm not telling you");