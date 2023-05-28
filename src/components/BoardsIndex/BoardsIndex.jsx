import './BoardsIndex.css'
import BoardCard from '../BoardCard/BoardCard'
import { useEffect } from 'react'

export default function BoardsIndex({boards, setActive, boardFunctions}) {

    useEffect( function() {
        setActive('all')
    }, [])


    return (
        <div className='flex-container'>
            <div className='boards-index-container'>
                <div className='boards-index'>
                    {boards.map( (board, idx) => <BoardCard key={idx} board={board} setActive={setActive} boardFunctions={boardFunctions}/>)}
                </div>
            </div>
        </div>
    )
}