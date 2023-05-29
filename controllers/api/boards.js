const Board = require('../../models/board')
const User = require('../../models/user')

module.exports = {
    create,
    show,
    index,
    addItem,
    removeItem,
    update,
    delete: deleteBoard
}

async function create(req,res) {
    const curUser = await User.findByIdAndUpdate(req.user._id,{ $inc: { boards: 1 } }, {new:true})
    req.body.board.order = curUser.boards
    const board = await Board.create(req.body.board)
    console.log(board)
    res.json(board)
}

async function show(req, res) {
    const board = await Board.findById(req.params.id)
    res.json(board)
}

async function index(req, res) {
    let boards = []
    if (req.user) {
        boards = await Board.find({user: req.user._id}).sort({ order: 1 })
    }
    res.json(boards)  
}

async function addItem(req,res) {
    const board = await Board.findById(req.params.id)
    board.items.push(req.body.item)
    board.save()
    res.json(board)
}

async function removeItem(req, res) {
    try {
        const board = await Board.findOne({'items._id': req.params.id})
        board.items.remove(req.params.id)
        await board.save()
        res.json(board)
    } catch (err) {
        res.json(`error: ${err}`)
    }
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
        await User.findByIdAndUpdate(req.user._id,{ $inc: { boards: -1 } }, {new:true})
        await Board.deleteOne({_id: req.params.id})
        res.json('successful delete')
    } catch(err) {
        res.json(`error: ${err}`)
    }
}