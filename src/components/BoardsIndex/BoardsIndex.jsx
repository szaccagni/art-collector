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
                {boards.length ? 
                <div className='boards-index'>
                    {boards.map( (board, idx) => <BoardCard key={idx} board={board} setActive={setActive} boardFunctions={boardFunctions}/>)}
                </div>
                : 
                <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{width: '60%', fontSize: '25px'}}>
                        Thank you for trying out this app. To get started, please click 'New Board' in the upper right hand corner, there you will be prompted to give your board a name and description. After that you can start adding art to your board!
                    </div>
                </div>
                }   
            </div>
        </div>
    )
}