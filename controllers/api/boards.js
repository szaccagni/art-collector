const Board = require('../../models/board')

module.exports = {
    create,
    index,
    addItem
}

async function create(req,res) {
    const board = await Board.create(req.body.board)
    res.json(board)
}

async function index(req, res) {
    let boards = []
    if (req.user) {
        boards = await Board.find({user: req.user._id})
    }
    res.json(boards)  
}

async function addItem(req,res) {
    const board = await Board.findById(req.body.boardId)
    board.items.push(req.body.item)
    board.save()
    res.json(board)
}