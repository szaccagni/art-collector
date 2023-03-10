import BoardForm from "../../components/BoardForm/BoardForm"
import BoardsIndex from "../../components/BoardsIndex/BoardsIndex"
import BoardDetail from "../../components/BoardDetail/BoardDetail"

export default function BoardPage({user, boards, showBoardComponent, curBoard, setActive, boardFunctions}) {
    const blankBoard = {
        name: '',
        description: ''
    }

    return (
        <>
            { showBoardComponent === 'new board' ? 
                <div className='board-detail flex-container'>
                    <div className='board-detail-left'>
                        <BoardForm user={user} board={blankBoard} boardFunctions={boardFunctions}/> 
                    </div>
                </div>
            : '' }

            { showBoardComponent === 'index' ?  <BoardsIndex boards={boards} setActive={setActive} boardFunctions={boardFunctions}/> : ''}  

            { showBoardComponent === 'board deatil' ? <BoardDetail user={user} curBoard={curBoard} boardFunctions={boardFunctions}/> : ''} 
        </>
    )
}