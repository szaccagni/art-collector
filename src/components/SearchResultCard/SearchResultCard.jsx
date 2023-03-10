import './SearchResultCard.css'
export default function SearchResultCard({result, addItem}) {
    const itemData = {
        apiID: result.objectID,
        title: result.title,
        url: result.primaryImage,
        artist: result.artistDisplayName
    }

    return (
        <div className='search-result-card'>
            <span>{itemData.title} {itemData.artist !== '' ?  ` by  ${itemData.artist}` : ''}</span>
            <span><img src={result.primaryImage} alt={result.title}></img></span>
            <span><button className='btn btn2' onClick={() => addItem(itemData)}> add </button></span>
        </div>
    )
}