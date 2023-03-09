import {useState} from 'react'
import * as boardAPI from '../../utilities/board-api'
import ItemForm from '../ItemForm/ItemForm'
import MetSearch from '../../pages/MetSearch/MetSearch'

export default function BoardDetail({curBoard, showBoard}) {
    const [showComponets, setShowComponents] = useState('buttons')

    async function addItem(item) {
        const updatedBoard = await boardAPI.addItem(curBoard._id, item)
        setShowComponents('buttons')
        showBoard(updatedBoard)
    }

    return (
        <>
        <div>
            <div>{curBoard.name}</div>
            <div>{curBoard.description}</div>
        </div>
        <div>
            {showComponets === 'buttons' ? 
            <>
                <button onClick={() => setShowComponents('web')}>Link Image from the Web</button>
                <button onClick={() => setShowComponents('met')}>Collect from The Met</button>
            </> : ''}
            {showComponets === 'web' ? <ItemForm addItem={addItem}/> : '' }
            {showComponets === 'met' ? <MetSearch /> : '' }
        </div>
        </>

    )
}