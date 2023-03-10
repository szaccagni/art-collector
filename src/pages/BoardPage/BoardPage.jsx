import NewBoardForm from "../../components/NewBoardForm/NewBoardForm"
import BoardsIndex from "../../components/BoardsIndex/BoardsIndex"
import BoardDetail from "../../components/BoardDetail/BoardDetail"

export default function BoardPage({user, addBoard, boards, showBoardComponent, curBoard, showBoard, setActive}) {
    const blankBoard = {
        name: '',
        description: ''
    }

    return (
        <>
            { showBoardComponent === 'new board' ? 
                <div className='board-detail flex-container'>
                    <div className='board-detail-left'>
                        <NewBoardForm user={user} addBoard={addBoard} board={blankBoard} /> 
                    </div>
                </div>
            : '' }

            { showBoardComponent === 'index' ?  <BoardsIndex boards={boards} showBoard={showBoard} setActive={setActive} /> : ''}  

            { showBoardComponent === 'board deatil' ? <BoardDetail user={user} curBoard={curBoard} showBoard={showBoard} /> : ''} 
        </>
    )
}