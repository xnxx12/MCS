require('dotenv').config();
const express = require('express')
require("./connection/connection");
const app = express();
const port = 8000;
const cors = require('cors')
const User = require("./models/user");
const Task = require("./models/task");
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(express.json())

app.get('/',(req,res)=>{
    try {
        const token = req.query.token;
        jwt.verify(token,process.env.ACCESS_KEY,async (err,user)=>{
            if(err){console.log(err);return res.sendStatus(404);}

            const r = await User.find({
                Email : user.Email,
                Password : user.Password
            });

            if(r.length){
                return res.status(200).send(r[0]);
            }else{
                return res.sendStatus(404);
            }
        })
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(501);
    }
})

app.get('/login',async(req,res)=>{
      
    try {
        const r = await User.find({Email : req.query.email,Password : req.query.password})
        
        if(r.length) {
            const token = jwt.sign({
                Email: req.query.email,
                Password: req.query.password,
            },process.env.ACCESS_KEY);

            return res.status(200).json(token);
        }
        
    } catch (error) {
        
        console.log(error);
        res.send(404);
    }
    
})

app.post('/register',(req,res)=>{
    try {
        console.log(req.body);
        const user = new User({
            Name: req.body.name,
            Email: req.body.email,
            Password: req.body.password,
        });
        user.save()
            .then(() => {
                console.log("user saved");
                return res.sendStatus(201);
            })
            .catch((err) => {
                console.log(err);
                return res.sendStatus(400);
            });

    } catch (error) {
        return res.sendStatus(501)
    }
})

app.post('/addTask', (req,res)=>{
    try {
        const token = req.query.token;
        // console.log(token);
        jwt.verify(token,process.env.ACCESS_KEY,async (err,user)=>{
            if (err) {console.log(err);return res.sendStatus(401);}
            else {
                const r = await User.find({
                    Email: user.Email,
                    Password: user.Password,
                });

                if(r.length){
                    const task = new Task({
                        Heading: req.body.heading,
                        Body : req.body.body,
                        User : r[0]._id
                    });
                    // console.log(task);
                    r[0].Tasks.push(task._id);
                    await task.save()
                    await r[0].save();
                    return res.sendStatus(201)
                }else{
                    return res.sendStatus(404);
                }
            }
        })
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(501);
    }
})

app.delete('/removeTask' , (req,res)=>{
    try {
        const token = req.query.token;
        jwt.verify(token , process.env.ACCESS_KEY , async (err,user)=>{
            if(err){console.log(err);return res.sendStatus(401);}

            const r = await User.find({
                Email: user.Email,
                Password: user.Password,
            });
            // console.log(req.body.task);
            const t = await Task.find({
                _id : req.body.task
            })
            // console.log(t[0].User);
            // console.log((r[0]._id).toString());
            if (r.length && t.length && t[0].User === r[0]._id.toString()) {
                const temp = [];
                r[0].Tasks.forEach((e) => {
                    if (e !== t[0]._id) temp.push(e);
                });
                r[0].Tasks = temp;
                await r[0].save();
                await Task.deleteOne(t[0]);
                return res.sendStatus(201);
            } else {
                return res.sendStatus(404);
            }
        })
    } catch (error) {
        return res.sendStatus(501);
    }
})

app.get('/taskDetails' ,async (req,res)=>{
    try {
        const _id = req.query.id;

        const r = await Task.find({_id});

        if(r.length){
            console.log(r[0]);
            return res.status(200).send(r[0]);
        }
        else{
            return res.sendStatus(404);
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(501);
    }
})


app.listen(port,()=>{
    console.log(`server started at port ${port}`);
})