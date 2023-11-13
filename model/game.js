import mongoose from "mongoose";

const GameSchema = mongoose.Schema({
    link:{
        type: String,
        required: true
    },
    githubusername:{
        type: String,
        required: true
    },
    projectname:{
        type: String,
        required: true
    },
    description:String,
    likes:{
        type:Number,
        default:0
    },
    
    dislikes:{
        type:Number,
        default:0
    },
    comment:[{body:String,authorId:String}],
    userId: {
        type: String,
        required: true
    }
})

const Game = mongoose.model("Game", GameSchema);
export default Game;