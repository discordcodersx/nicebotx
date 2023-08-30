const { searchPage, searchVideos } = require("../../tools/pornApi.js")
const DiscordJS  = require("discord.js")
const { MessageEmbed } = require("discord.js")

//const { page, videos } = require("../test.js") // Test var
const { MAIN_COLOR, ERROR_COLOR }  = require("../../config.json")
const emojis = {
    1: "<:1_:984773573187092480>",
    2: "<:2_:984773656104300544>",
    3: "<:3_:984778364529311784>",
    4: "<:4_:984773749813440542>",
    5: "<:5_:984773925877731339>",
    6: "<:6_:984773976062570528>",
    7: "<:7_:984774063819984916>",
    8: "<:8_:984774119943962644>",
    9: "<:9_:984774172561506336>"
}

function formatNum(num) {
    var n = new Intl.NumberFormat().format(num)
    var res = n.slice(0, 9).concat(n.slice(10, 12))
    return res;
}
exports.run = async (client, message, args) => {
  if (!message.channel.nsfw) return message.channel.send(client.config.msg.nsfwWarn)
        const errorEmbed = new MessageEmbed()
            .setColor(ERROR_COLOR)
            .setTitle("Syntax Error")
            .setDescription("Command syntax is: `.search [Keywords: String]`")

        args = [args.join(" ")]

        if(args[0] == "") {
            return message.channel.send(errorEmbed)
        }


        // Videos fetching
        searchVideos(args[0]).then((videos) => {
            console.log("Successfully fetched videos")


            // Videos Embed


            const videosEmbed = new MessageEmbed()
                .setColor(MAIN_COLOR)
                .setFooter({ text: `Click the corresponding numbers to see more details`})

            const reactions = []
            for(var i = 0; i < 9 && videos.results[i]; i++) {
                videosEmbed.addField(`${i + 1}. ${videos.results[i].title}`, ` ${formatNum(videos.results[i].views)} <:pornhubicon:985262103667548201> [(Video Link)](${videos.results[i].link})`, false)
                videosEmbed.setTitle(`Top ${i + 1} Results For \"${args[0]}\"`)
                reactions.push(emojis[i + 1])
            }

            message.channel.send(videosEmbed).then( msg => { // Send videos embed
                for(var i = 0; i < reactions.length; i++) { // Load reactions for videos embed
                    msg.react(reactions[i])
                }

                const filter = (reaction, user) => {
                    return user.id != msg.author.id && user.id == message.author.id;
                };

                const collector = msg.createReactionCollector({ filter, max: 1, time: 60000, errors: ["time"] });

                collector.on('collect', (reaction, user) => { // On number click
                    console.log("Fetching page...")

                    // Page fetching
                    searchPage(videos.results[parseInt(reaction.emoji.name.charAt(0) - 1)].link).then((page) => {
                        console.log("Successfully fetched page")


                        // Page Embed


                        const pageEmbed = new MessageEmbed()
                            .setColor(MAIN_COLOR)
                            .setTitle(`${page.title}`)
                            .setURL(`${videos.results[parseInt(reaction.emoji.name.charAt(0) - 1)].link}`)
                            .setDescription(`${page.description.substring(0,100) + "..."}\n\n<:views:984490732700192798> ${formatNum(page.views)} <:like:984501030882537543> ${page.percent}%  ${page.number_of_comment}`)
                            .setImage(page.thumbnail_url)
                            .setAuthor({ name: "Featured Pornstars: " + page.pornstars.toString().replace(/,/g, " ,") })
                            .setFooter({ text: `Duration: ${new Date(page.duration * 1000).toISOString().slice(14, 19)}`})

                        msg.edit(pageEmbed).then( msg => { // Send page embed + Load new reactions for page embed
                            msg.reactions.removeAll()
                            msg.react("⏩")

                            const filter = (reaction, user) => {
                                return reaction.emoji.name == "customtrashcan" && user.id != msg.author.id && user.id == message.author.id;
                            }

                            const collector = msg.createReactionCollector({ filter, max: 1, time: 60000, errors: ["time"] });

                            collector.on('collect', (reaction, user) => {
                                msg.delete();
                            })
                        })

                    }).catch(() => {
                        msg.edit("bir hata oluştu")
                    })
                })
            })
        }).catch(() => {
            message.channel.send("Ya geçersiz bir anahtar kelime yazdınız ya da Pornhub çok fazla istek gönderilmesi nedeniyle bu IP dou'yu engelledi. Bu durumda daha sonra tekrar deneyin")
        })
    }

exports.help = {
  name: "pornhubsearch",
  description: `Send a pornhubsearchimage.`,
  usage: "pornhubsearch",
  example: "pornhubsearch"
};

exports.conf = {
  aliases: [],
  cooldown: 5 // Integer = second.
};