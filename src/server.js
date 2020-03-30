// Use express to create and configure my server
const express = require("express");
const server = express();

const db = require("./db");

//Configure statics files (css, scripts, images)
server.use(express.static("./src/public"));

//Enable use req.body
server.use(express.urlencoded({ extended: true }));

//Configure nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("./src/views", {
  express: server,
  noCache: true
});

//Create route /
//And catch the client request to reply
server.get("/", function(req, res) {
  db.all(`SELECT * FROM ideas`, function(err, rows) {
    if (err) {
      console.log(err);
      res.send("Erro no banco de dados");
    }

    const reversedIdeas = [...rows].reverse();
    let lastIdeas = [];
    for (let idea of reversedIdeas) {
      if (lastIdeas.length < 2) {
        lastIdeas.push(idea);
      }
    }

    return res.render("index.html", { ideas: lastIdeas });
  });
});

server.get("/ideas", function(req, res) {
  db.all(`SELECT * FROM ideas`, function(err, rows) {
    if (err) {
      console.log(err);
      res.send("Erro no banco de dados");
    }

    const reversedIdeas = [...rows].reverse();
    return res.render("ideas.html", { ideas: reversedIdeas });
  });
});

server.post("/", function(req, res) {
  // //Insert data in table
  const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?, ?, ?, ?, ?);
    `;
  const values = [
    req.body.image,
    req.body.title,
    req.body.category,
    req.body.description,
    req.body.link
  ];
  db.run(query, values, function(err) {
    if (err) {
      console.log(err);
      res.send("Erro no banco de dados");
    }
    return res.redirect("/ideas");
  });
});

//Start the server in 3000 port
server.listen(3000);
