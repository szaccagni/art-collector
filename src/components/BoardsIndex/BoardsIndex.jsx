import BoardCard from '../BoardCard/BoardCard'

export default function BoardsIndex({boards, showBoard}) {
    return (
        <div className='flex-container'>
            <div className='BoardsIndex'>
                {boards.map( (board, idx) => <BoardCard key={idx} board={board} showBoard={showBoard}/>)}
            </div>
        </div>
    )
}