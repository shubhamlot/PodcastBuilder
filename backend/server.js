const fs = require('fs')
const RSS = require('rss')

const blog = {
    title: "W3Schools Home Page",
    url:"https://www.w3schools.com",
    discription:"Free web building tutorials",
    author:"free",
    artcles:[{
        title:"free",
        url:"https://www.w3schools.com/xml/xml_rss.asp",
        pulishedDate:"June 20, 2020 04:00:00 GMT"
    }]
}


const feed = new RSS({
    title: blog.title,
    description: blog.discription,
    feed_url: 'http://example.com/rss.xml',

})

for(const artcles of blog.artcles){
    feed.item({
        title:artcles.title,
        url:artcles.url,
        date:artcles.pulishedDate
    })
}


const xml = feed.xml({indent:true})
fs.writeFileSync("feed.xml",xml)
