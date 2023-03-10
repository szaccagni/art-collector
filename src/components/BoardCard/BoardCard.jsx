import './BoardCard.css'

export default function BoardCard({board, showBoard, setActive}) {
    function handleClick() {
        showBoard(board)
        setActive('')
    }
    
    return (
        <a className='board-card' onClick={handleClick}>
            <div className='board-name'>{board.name}</div>
            <div className='board-card-img-container'>
                {board.items.map((item, idx) => <div key={idx}><img src={item.url}/></div>)}
            </div>
        </a>
    )
}