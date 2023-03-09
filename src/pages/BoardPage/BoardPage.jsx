import NewBoardForm from "../../components/NewBoardForm/NewBoardForm"
import BoardsIndex from "../../components/BoardsIndex/BoardsIndex"
import BoardDetail from "../../components/BoardDetail/BoardDetail"

export default function BoardPage({user, addBoard, boards, showBoardComponent, curBoard, showBoard}) {
    return (
        <>
            { showBoardComponent === 'new board' ? <NewBoardForm user={user} addBoard={addBoard} /> : '' }

            { showBoardComponent === 'index' ?  <BoardsIndex boards={boards} showBoard={showBoard}/> : ''}  

            { showBoardComponent === 'board deatil' ? <BoardDetail curBoard={curBoard} showBoard={showBoard}/> : ''} 
        </>
    )
}