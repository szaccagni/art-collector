import './BoardDetail.css'

import {useState, useEffect} from 'react'
import * as boardAPI from '../../utilities/board-api'
import ItemForm from '../ItemForm/ItemForm'
import MetSearch from '../../pages/MetSearch/MetSearch'
import RijksSearch from '../../pages/RijksSearch/RijksSearch'
import BoardForm from '../BoardForm/BoardForm'

export default function BoardDetail({curBoard, user, boardFunctions}) {
    const [showComponets, setShowComponents] = useState('init')

    useEffect( function() {
        setShowComponents('init')
    }, [curBoard])
    
    async function addItem(item) {
        const updatedBoard = await boardAPI.addItem(curBoard._id, item)
        setShowComponents('buttons')
        boardFunctions.showBoard(updatedBoard)
    }

    async function quickAddItem(item) {
        await boardAPI.addItem(curBoard._id, item)
    }

    async function removeItem(item) {
        const updatedBoard = await boardAPI.removeItem(item._id)
        boardFunctions.showBoard(updatedBoard)
    }

    async function reloadBoard() {
        boardFunctions.getOneBoard(curBoard._id)
        setShowComponents('init')
    }

    return (
        <div className='board-detail flex-container'>
            <div className='board-detail-left'>
                { showComponets !== 'edit'? 
                    <div className='board-detail-info'>
                        <a onClick={reloadBoard}><div className='board-detail-title'>{curBoard.name}</div></a>
                        <div className='board-detail-description'>{curBoard.description}</div>
                    </div>
                : ''}
                { showComponets === 'edit' ? <BoardForm user={user} board={curBoard} boardFunctions={boardFunctions}/>: ''}
                { showComponets === 'init' ? 
                    <div className='editBtns'>
                        <a onClick={() => setShowComponents('edit')}>Edit</a>
                        <a onClick={() => setShowComponents('buttons')}>Add to Collection</a>
                        <a onClick={() => setShowComponents('remove')}>Remove from Collection</a>
                    </div>
                : ''}
                { showComponets === 'buttons' ? 
                    <div className='buttons'>
                        <div>
                            <button className='btn' onClick={() => setShowComponents('web')}>Collect from the Web</button>
                        </div>
                        <div>
                            <button className='btn' onClick={() => setShowComponents('met')}>Collect from The Met</button>
                        </div>
                        <div>
                            <button className='btn' onClick={() => setShowComponents('rijks')}>Collect from Rijks</button>
                        </div>
                    </div>
                    : ''
                }
            </div>

            <div className='board-detail-right'>
                {showComponets === 'web' ? <ItemForm addItem={addItem} /> : '' }
                {showComponets === 'met' ? <MetSearch addItem={addItem} /> : '' }
                {showComponets === 'rijks' ? <RijksSearch addItem={addItem} quickAddItem={quickAddItem}/> : '' }
                {showComponets !== 'web' && showComponets !== 'met' && showComponets !== 'rijks' ? 
                    <div className='board-imgs-container'>
                        {curBoard.items.map((item, idx) => 
                            <div className='board-detail-img-container' key={idx}>
                                    {showComponets === 'remove' ? 
                                    <button onClick={() => removeItem(item)}>x</button> : ''}
                                    <img src={item.url}/>
                            </div>
                        )}
                    </div>
                : '' }
            </div>
        </div>
    )
}