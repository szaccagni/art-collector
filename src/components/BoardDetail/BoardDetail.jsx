import './BoardDetail.css'

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
            { showComponets === 'buttons' ? 
                <>
                <div>
                    <button onClick={() => setShowComponents('web')}>Link Image from the Web</button>
                    <button onClick={() => setShowComponents('met')}>Collect from The Met</button>
                </div>
                <div className='board-imgs-container'>
                    {curBoard.items.map((item, idx) => <div className='board-detail-img-container' key={idx}><img src={item.url}/></div>)}
                </div>
                </>
                : ''
            }
        </div>

        <div>
            {showComponets === 'web' ? <ItemForm addItem={addItem}/> : '' }
            {showComponets === 'met' ? <MetSearch addItem={addItem}/> : '' }
        </div>
        </>

    )
}