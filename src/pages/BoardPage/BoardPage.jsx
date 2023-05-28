import { useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import * as boardAPI from '../../utilities/board-api'
import BoardForm from "../../components/BoardForm/BoardForm"
import BoardsIndex from "../../components/BoardsIndex/BoardsIndex"
import BoardDetail from "../../components/BoardDetail/BoardDetail"


export default function BoardPage({user, boards, setActive, getBoards}) {
    const [ curBoard, setCurBoard ] = useState(getCurBoard())

    const navigate = useNavigate()

    const blankBoard = {
        name: '',
        description: ''
    }

    function getCurBoard() {
        const storedBoard = localStorage.getItem('curBoard');
        return (JSON.parse(storedBoard) || '')
    }

    function clearCurrentBoard() {
        localStorage.removeItem('curBoard')
        setCurBoard('')
        return
    }

    async function addBoard(newBoard) {
        const res = await boardAPI.addBoard(newBoard)
        if (res) {
          showBoard(res)
        }
        getBoards()
    }
    
    function showBoard(board) {
        setCurBoard(board)
        localStorage.setItem('curBoard', JSON.stringify(board));
        navigate('/boards/detail')
    }
    
    async function updateBoard(board) {
        const res = await boardAPI.updateBoard(board._id, board)
        if (res) {
            showBoard(res)
        }
        getBoards()
    }
    
    async function deleteBoard(id) {
        await boardAPI.deleteBoard(id)
        getBoards()
        clearCurrentBoard()
        navigate('/boards/all')
    }
    
    async function getOneBoard(id) {
        const board = await boardAPI.getOneBoard(id)
        setCurBoard(board)
    }
    
    const boardFunctions = {
        addBoard: addBoard,
        showBoard: showBoard,
        updateBoard: updateBoard,
        deleteBoard: deleteBoard,
        getOneBoard: getOneBoard,
        // clearCurrentBoard: clearCurrentBoard
    }    

    return (
        <>
            <Routes>
                <Route path="/boards/all" element={<BoardsIndex boards={boards} setActive={setActive} boardFunctions={boardFunctions}/>}></Route>
                <Route path="/boards/new" element={<BoardForm user={user} board={blankBoard} boardFunctions={boardFunctions}/>}></Route>
                <Route path="/boards/detail" element={<BoardDetail user={user} curBoard={curBoard} boardFunctions={boardFunctions}/>}></Route>
                <Route path="/*" element={<Navigate to="/boards/all" />}></Route>
            </Routes>
        </>
    )
}