const Feed = require('feed').Feed;
const fs = require('fs')
const feed = new Feed({
  title: "Channel name",
  description: "This is my personal feed!",
  // link: "http://example.com/",
  language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
  image: "coverimg",
  copyright: "All rights reserved 2013, John Doe",
  generator: "Podcast Builder", // optional, default = 'Feed for Node.js'
  category:"education",
  creator:"John"
});




// posts.forEach(post => {
//   feed.addItem({
//     title: post.title,
//     id: post.url,
//     link: post.url,
//     description: post.description,
//     content: post.content,
//     author: [
//       {
//         name: "Jane Doe",
//         email: "janedoe@example.com",
//         link: "https://example.com/janedoe"
//       },
//       {
//         name: "Joe Smith",
//         email: "joesmith@example.com",
//         link: "https://example.com/joesmith"
//       }
//     ],
//     contributor: [
//       {
//         name: "Shawn Kemp",
//         email: "shawnkemp@example.com",
//         link: "https://example.com/shawnkemp"
//       },
//       {
//         name: "Reggie Miller",
//         email: "reggiemiller@example.com",
//         link: "https://example.com/reggiemiller"
//       }
//     ],
//     date: post.date,
//     image: post.image
//   });
// });

// feed.addCategory("Technologie");

// feed.addContributor({
//   name: "Johan Cruyff",
//   email: "johancruyff@example.com",
//   link: "https://example.com/johancruyff"
// });

console.log(feed.rss2());



fs.writeFileSync("feed.xml",feed.rss2())
// Output: JSON Feed 1.0