import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];

app.post("/tasks", (req, res) => {
    
    const task = req.body;
    task.id = 200;
    console.log(task);

    tasks.push(task);
    res.send(task);    
});

app.get("/tasks", (req, res) => {
    res.send(tasks);
});

app.listen(5000);