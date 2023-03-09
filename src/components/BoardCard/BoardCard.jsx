export default function BoardCard({board, showBoard}) {
    return <div><a onClick={() => showBoard(board)}>{board.name}</a></div>
}