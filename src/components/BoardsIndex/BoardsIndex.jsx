import './BoardsIndex.css'
import BoardCard from '../BoardCard/BoardCard'

export default function BoardsIndex({boards, showBoard, setActive}) {
    return (
        <div className='flex-container'>
            <div className='boards-index-container'>
                <div className='boards-index'>
                    {boards.map( (board, idx) => <BoardCard key={idx} board={board} showBoard={showBoard} setActive={setActive}/>)}
                </div>
            </div>
        </div>
    )
}