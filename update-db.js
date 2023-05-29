require('dotenv').config();
require('./config/database');

const Board = require('./models/board')
const User = require('./models/user')

async function updateBoardOrder() {
    const boards = await Board.find()
    const boardsByUser = {}
    boards.forEach(board => {
        userId = board.user._id.toString()
        if (!boardsByUser[userId]) {
            boardsByUser[userId] = [board]
        } else {
            boardsByUser[userId].push(board)
        }
    })
    for (const user of Object.keys(boardsByUser)) {
        let order = 0; // Initial order value
    
        for (const board of boardsByUser[user]) {
          const updatedBoard = await Board.findByIdAndUpdate(board._id, { order: order++ }, { new: true });
    
          if (updatedBoard) {
            console.log(`Board ${updatedBoard._id} updated successfully`);
          } else {
            console.log(`Error updating board ${board._id}`);
          }
        }
    }
    process.exit()
}

async function updateUserBoardCount() {
    const users = await User.find()
    for (const user of users) {
        const boardCount = await Board.find({user: user._id})
        const boardCountLen = boardCount.length
        const updatedUser = await User.findByIdAndUpdate(user._id, {boards: boardCountLen}, {new:true})
        if (updatedUser) {
            console.log(`User ${updatedUser._id} updated successfully`);
        } else {
            console.log(`Error updating user ${updatedUser._id}`);
        }
    }
    process.exit()
} 