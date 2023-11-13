import express from 'express';
import Game from '../model/game.js';
import User from '../model/user.js';
import { exec} from 'child_process'
const router = express.Router()

const regex = /https:\/\/github\.com\/([^\/]+)\/([^\.]+)\.git/
const getProjectName = (string)=>{
    const match = regex.exec(string)
    return match
}

const cloneProject = async(link)=>{
    await exec(`cd public/games && git clone ${link}`,(err, stdout, stderr)=>{
        if(err){
            console.log(err)
        }else{
            console.log(stdout)
        }
    })
}

router.post('/add', async (req, res)=>{
    try{
        const {link,userId} = req.body;
        const match = getProjectName(link)
        if(match){
            const isProject = await Game.findOne({projectname:match[2]})
            console.log(isProject)
            if(!isProject){
                await cloneProject(link)
            }
            const newGame = new Game({
                link,
                githubusername:match[1],
                projectname:match[2],
                userId
            })
            
            await newGame.save();
            
            res.json({status:200,message:"game added"})
        }else{
            res.json({status:400,message:"invalid link"})
        }
        
    }catch(err){
        console.log(err);
    }
})

router.get('/getgames',async (req, res)=>{
    try{
        const games = await Game.find()
        res.json({status:200,data:games})
    }catch(err){
        console.log(err);
    }
})
router.patch('/:id/like',async (req, res)=>{
    try{
        const {id} = req.params;
        const game = await Game.findOne({_id:id})
        if(game){
            game.likes++
            await game.save()
            res.json({status:200,message:"like added"})
        }else{
            res.json({status:400,message:"game not found"})
        }
        
    }catch(err){
        console.log(err);
    }
});
router.patch('/:id/dislike',async (req, res)=>{
    try{
        const {id} = req.params;
        const game = await Game.findOne({_id:id})
        if(game){
            game.dislikes++
            await game.save()
            res.json({status:200,message:"dislike added"})
        }else{
            res.json({status:400,message:"game not found"})
        }
        
    }catch(err){
        console.log(err);
    }
});

router.post('/:id/comment',async (req, res) => {
    try{
        const id = req.params.id;
        // const {body,authorId} = req.body;
        const game = await Game.findOne({_id:id})
        if(game){
            game.comment.push(req.body)
            await game.save()
            res.json({status:200,message:"comment added"})
        }else{
            res.json({status:400,message:"game not found"})
        }
        
    }catch(err){
        console.log(err);
    }
})

router.get('/:id/getcomments',async (req, res) => {
    try{
        const id = req.params.id;
        const game = await Game.findOne({_id:id})
        console.log(game);
        if(game){
            const comments = game.comment
            const data = comments.map(async (com)=> {
                let user = await User.findById(com.authorId)
                return user
            })
            res.json({status:200,comment:comments,author:data})
        }else{
            res.json({status:400,message:"game not found"})
        }
        
    }catch(err){
        console.log(err);
    }
})

export default router