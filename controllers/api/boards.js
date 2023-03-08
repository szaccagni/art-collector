const Board = require('../../models/board')

module.exports = {
    create
}

async function create(req,res) {
    const board = await Board.create(req.body.board)
    res.json(board)
}