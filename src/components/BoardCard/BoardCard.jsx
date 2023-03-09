import './BoardCard.css'

export default function BoardCard({board, showBoard}) {
    
    return (
        <a className='BoardCard' onClick={() => showBoard(board)}>
            <div className='board-name'>{board.name}</div>
            {/* <div>
                {board.items.map(item => <div><img src={item.url}/></div>)}
            </div> */}
        </a>
    )
}