import BoardCard from "../BoardCard/BoardCard"

export default function BoardsIndex({boards}) {
    return (
        <>
            {boards.map( (board, idx) => <BoardCard key={idx} board={board}/>)}
        </>
    )
}