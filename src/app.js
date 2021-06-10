import express from 'express';
import cors from 'cors';
import fs from 'fs'

const app = express(); 

app.use(cors());
app.use(express.json());

let posts = [];
let commentCount = 0;

if (fs.existsSync("posts.txt")) {
    posts = JSON.parse(fs.readFileSync("posts.txt"));
}
    

app.get("/posts", (req, res) => {
    res.send(posts);
});

app.get("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);    
    const post = posts.find((post) => post.id === id);     
    res.send(post);      
});

app.post("/posts", (req, res) => {
   const newPost = req.body;
   posts.push({id: posts.length + 1, comments:[] , commentCount, ...newPost, contentPreview: "La la la não sei"});
   fs.writeFileSync("posts.txt", JSON.stringify(posts));
   res.send("OK")     
});

app.get("/posts/:id/comments", (req, res) => {
    const id = parseInt(req.params.id);  
    const postClicked = posts.find((post) => post.id === id);        
    res.send(postClicked.comments);
});

app.post("/posts/:id/comments", (req, res) => {        
    const id = parseInt(req.params.id);      
    const postClicked = posts.find((post) => post.id === id);  
    const commentsOf = postClicked.comments;      
    const { author, content} = req.body;

    const newComment = {
        author,
        content,
        commentCount: commentCount++
    };  

    commentsOf.push(newComment);   
    console.log(commentsOf)
    fs.writeFileSync("posts.txt", JSON.stringify(posts));
    res.send(commentsOf);           
});

app.put("/posts/:id",  (req, res) => {
    const id = parseInt(req.params.id); 
    const postClicked = posts.find((post) => post.id === id);    
    postClicked.title = req.body.title;
    postClicked.content = req.body.content;
    postClicked.coverUrl = req.body.coverUrl; 
    fs.writeFileSync("posts.txt", JSON.stringify(posts)); 
    res.send("Ok")
});

app.delete("/posts/:id",  (req, res) => {
    const id = parseInt(req.params.id);
    const postClicked = posts.find((post) => post.id === id);    
    posts.splice(postClicked.id-1, 1)  
    fs.writeFileSync("posts.txt", JSON.stringify(posts));
    res.send("Ok")
})

app.listen(4000);

