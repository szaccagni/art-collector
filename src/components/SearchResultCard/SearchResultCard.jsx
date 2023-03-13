import './SearchResultCard.css'
import {useState} from 'react'

export default function SearchResultCard({result, addItem, quickAddItem}) {
    const [imgClass, setImgClass] = useState('')
    const [buttonClass, setButtonClass] = useState('hide-btn')
    const [quickAddClass, setQuickAddClass] = useState('btn btn2')
    const [addedClass, setAddedClass] = useState('hide-btn')

    const itemData = {
        apiID: result.objectID,
        title: result.title,
        url: result.primaryImage,
        artist: result.artistDisplayName
    }

    function handleHover() {
        setImgClass('hover')
        setButtonClass('search-result-btn-container')
    }

    function handleMouseLeave() {
        setImgClass('')
        setButtonClass('hide-btn')
    }

    function quickAdd() {
        setQuickAddClass('hide-btn')
        quickAddItem(itemData)
        setAddedClass('added-note')
    }

    return (
        <div className='search-result-card'>
            <div className='result-title'>
                <span><span className='bold'>{itemData.title}</span> &nbsp;
                {itemData.artist !== '' ?  `by  ${itemData.artist}` : ''}</span>
            </div>
            <span><img className={imgClass} src={itemData.url} alt={itemData.title} onMouseEnter={handleHover} onMouseLeave={handleMouseLeave}></img></span>
            <span className={buttonClass}>
                <button className={quickAddClass} onMouseEnter={handleHover} onClick={() => addItem(itemData)}> add and return to board </button>
                <button className={quickAddClass} onMouseEnter={handleHover} onClick={quickAdd}> quick add </button>
                <div className={addedClass} onMouseEnter={handleHover}>added!</div>
            </span>
        </div>
    )
}