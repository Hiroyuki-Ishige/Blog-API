import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//

//CHALLENGE 1: GET All posts
app.get("/posts", async (req, res) => {
  try {
    const response = posts;

    // console.log(response);
    res.json(response);
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

//CHALLENGE 2: GET a specific post by id
app.get("/posts/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id); // Convert the id in roothandler from string to integer
    //console.log(`GET specific post id: ${id}`);

    const post = posts.find((p) => p.id === id); // Find the joke with the matching id
    if (post) {
      res.json(post);
    } else {
      res.status(404).send("Joke not found"); // If the joke is not found, respond with 404 status
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

//CHALLENGE 3: POST a new post
app.post("/posts", async (req, res) => {
  try {
    const title = req.body.title;
    const content = req.body.content;
    const author = req.body.author;

    if (!title || !content || !author) {
      res.status(400).send("Title, Content and Author are required");
      return;
    }
    const newPost = {
      id: posts.length + 1,
      title: title,
      content: content,
      author: author,
      date: new Date(),
    };

    posts.push(newPost);
    res.json(newPost);
    console.log(posts.slice(-1));
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id); // Convert the id in roothandler from string to integer
    
    const existingPost = posts.find((p) => p.id === id); // Find the post with the id

    const updatePost = {
      id: id,
      title: req.body.title || existingPost.title,
      content: req.body.content || existingPost.content,
      author: req.body.author || existingPost.author,
      date: new Date(),
    };

    const postIndex = posts.findIndex((p) => p.id === id); // Find the post with the matching id
    if (postIndex !== -1) {
      posts[postIndex] = updatePost;
      res.json(posts[postIndex]);
      
    } else {
      res.status(404).send("Indicated Post not found"); // If the joke is not found, respond with 404 status
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

//CHALLENGE 5: DELETE a specific post by providing the post id.

app.delete("/posts/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id); // Convert the id in roothandler from string to integer

    const postIndex = posts.findIndex((p) => p.id === id); // Find the post with the matching id
    if (postIndex !== -1) {
      const deletePosts = posts.splice(postIndex,1);
      res.json(deletePosts[0]);
      
    } else {
      res.status(404).send("Indicated Post not found"); // If the joke is not found, respond with 404 status
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
