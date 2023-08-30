const Discord = require("discord.js"),
  nsfwBot = require("./handler/Client.js"),
  client = new nsfwBot(),
  config = require('./config.json');

require("discord-buttons")(client);
require("./handler/Module.js")(client);
require("./handler/Event.js")(client);
client.on("warn", console.warn); // This will warn you via logs if there was something wrong with your bot.
client.on("error", console.error); // This will send you an error message via logs if there was something missing with your coding.


client.on("message", async message => {
	
	const prefix = config.prefix;
    if (message.author.bot) return;

    if (message.content.indexOf(prefix) !== 0) return;
    var args = message.content.slice(prefix.length).trim().split(/ +/g);
    var command = args.shift().toLowerCase()

    if (command == "commands") {
        var countdownEmbed = new Discord.MessageEmbed()
            .setColor(`#33b51f`)
            .setDescription(` Command loaded`)



        if (command == "girl") {
    var embed = new Discord.MessageEmbed()
    .setImage('http://nsfw-gif.net/wp-content/uploads/2019/11/KendraSunderland-sfwgif-naturalbigtits-porn-animatedbigbreasts.gif')
	    
    message.channel.send(embed)
  	}
    
    if (command == "fuck") {
        var embed = new Discord.MessageEmbed()
        .setImage('http://nsfw-gif.net/wp-content/uploads/2019/11/LiyaSilver-fuckinghardcore-naturalbigtits-ddfnetworkarmy-ridingcock.gif')
        
        message.channel.send(embed)
    }
    
    if (command == "faketaxi") {
        var embed = new Discord.MessageEmbed()
        .setImage('http://nsfw-gif.net/wp-content/uploads/2019/11/dylannvox-fuckingbigtits-hardcoreporn-doggystyle-fuck.gif')
        
        message.channel.send(embed)
    }
    
    if(command == "blowjob") {
        var embed = new Discord.MessageEmbed()
        .setImage('http://nsfw-gif.net/wp-content/uploads/2019/10/GabbieCarter-naturalbigtits-teensex-pornstar-suckingcock.gif')	
        
        message.channel.send(embed)
    }
    }
})
client.login(config.token).catch(console.error); // This token will leads to the .env file. It's safe in there.