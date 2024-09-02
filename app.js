const express = require('express');
const path = require("node:path");
const app = express();
const port = 3000;

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Set view engine to EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Use Express's built-in body parser middleware
app.use(express.urlencoded({ extended: true }));

const links = [
    { href: "/", text: "Home" },
    { href: "/new", text: "New Message" },
  ];

// Sample messages
const messages = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    }
  ];

// Route for the homepage
app.get("/", (req, res) => {
    res.render("index", { title: "Mini Messageboard", links: links, messages: messages });
  });

// Route for new messages
app.get("/new", (req, res) => {
   res.render("new", { title: "New Message", links: links });
  });

// Route to handle the form submission (POST)
app.post("/new", (req, res) => {
    const newMessage = {
        text: req.body.message,  // This should match the 'name' attribute of the form input
        user: req.body.user,     // This should match the 'name' attribute of the form input
        added: new Date()
    };
    messages.push(newMessage);
    res.redirect("/");  // Redirect back to the homepage after submission
  });

// Route to handle displaying a single message by its index
app.get("/message/:id", (req, res) => {
    const messageIndex = req.params.id;
    const message = messages[messageIndex];

    if (message) {
        res.render("message", { title: "Message Details", message: message, links: links });
    } else {
        res.status(404).send("Message not found");
    }
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });