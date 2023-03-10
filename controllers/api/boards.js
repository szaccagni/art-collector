const Board = require('../../models/board')

module.exports = {
    create,
    index,
    addItem,
    update,
    delete: deleteBoard
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
    const board = await Board.findById(req.params.id)
    board.items.push(req.body.item)
    board.save()
    res.json(board)
}

async function update(req, res) {
    const board = await Board.findById(req.params.id)
    board.name = req.body.board.name
    board.description = req.body.board.description
    board.save()
    res.json(board)
}

async function deleteBoard(req,res) {
    try {
        await Board.deleteOne({_id: req.params.id})
        res.json('successful delete')
    } catch(err) {
        res.json(`there was an error ${err}`)
    }
}