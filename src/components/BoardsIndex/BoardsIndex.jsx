import BoardCard from '../BoardCard/BoardCard'

export default function BoardsIndex({boards, showBoard}) {
    return (
        <>
            {boards.map( (board, idx) => <BoardCard key={idx} board={board} showBoard={showBoard}/>)}
        </>
    )
}