import NewBoardForm from "../../components/NewBoardForm/NewBoardForm"
import BoardsIndex from "../../components/BoardsIndex/BoardsIndex"
import BoardDetail from "../BoardDetail/BoardDetail"

export default function BoardPage({user, addBoard, boards, showBoardComponent, curBoard}) {
    return (
        <>
            { showBoardComponent === 'new board' ? <NewBoardForm user={user} addBoard={addBoard} /> : '' }

            { showBoardComponent === 'index' ?  <BoardsIndex boards={boards}/> : ''}  

            { showBoardComponent === 'board deatil' ? <BoardDetail curBoard={curBoard} /> : ''} 
        </>
    )
}