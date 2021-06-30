const fs = require('fs') //to write the file
const RSS = require('rss')

const blog = {
    title: "W3Schools Home Page",
    url:"https://www.w3schools.com",
    discription:"Free web building tutorials",
    author:"free",
    contentType:"Important",
    country:"India",
    episodes:[{
        title:"Episode1",
        url:"https://www.w3schools.com/xml/xml_rss.asp",
        description:"Based on true story....!!",
        category:"Entertainment",
        pulishedDate:"June 20, 2020 04:00:00 GMT"
    },
    {
        title:"Episode2",
        url:"https://www.w3schools.com/xml/xml_rss.asp",
        description:"Welcome to starting a Podcast",
        category:"Seminar",
        pulishedDate:"June 25, 2020 04:00:00 GMT"
    }]
}


const feed = new RSS({
    title: blog.title,
    description: blog.discription,
    author:blog.author,
    contentType:blog.contentType,
    country:blog.country,
    feed_url: 'http://example.com/rss.xml',

})

for(const episodes of blog.episodes){
    feed.item({
        title:episodes.title,
        url:episodes.url,
        description:episodes.description,
        category:episodes.category,
        date:episodes.pulishedDate
    })
}


const xml = feed.xml({indent:true})
fs.writeFileSync("feed.xml",xml)


