import express from 'express';
import cors from 'cors';

const app = express(); 

app.use(cors());
app.use(express.json());

let posts = [{
    id: 1,
    title: 'Hello World TESTANDO HARD CODED NO SERVER',
    coverUrl: 'https://miro.medium.com/max/1024/1*OohqW5DGh9CQS4hLY5FXzA.png',
    contentPreview: 'Esta é a estrutura de um post esperado pelo front-end',
    content: 'Este é o conteúdo do post, o que realmente vai aparecer na página do post...',
    commentCount: 2,
    comments: [{
        id: 1,
        postId: 1,
        author: 'João',
        content: 'Muito bom esse post! Tá de parabéns'
    }],
},{
    id: 2,
    title: 'Hello World TESTANDO MAIS UMHARD CODED NO SERVER',
    coverUrl: 'https://miro.medium.com/max/1024/1*OohqW5DGh9CQS4hLY5FXzA.png',
    contentPreview: 'Esta é a estrutura de um post esperado pelo front-end',
    content: 'Este é o conteúdo do post, o que realmente vai aparecer na página do post...',
    commentCount: 2,
    comments: [{
        id: 1,
        postId: 2,
        author: 'Maria',
        content: 'Muito bom esse post! Tá de parabéns'
    }],
}];

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
   posts.push(newPost);
   res.send("ok")     
});

app.get("/posts/:id/comments", (req, res) => {
    const id = parseInt(req.params.id);  
    const postClicked = posts.find((post) => post.id === id);    
    console.log(postClicked.comments);      
    res.send(postClicked.comments);
});

app.post("/posts/:id/comments", (req, res) => {
    const id = parseInt(req.params.id);   
    const postClicked = posts.find((post) => post.id === id);  
    const commentsOf = postClicked.comments;    
    const newComment = req.body;
    commentsOf.push(newComment);
    res.send(commentsOf)     
});

app.listen(4000);

