import './SearchResultCard.css'
export default function SearchResultCard({result, addItem}) {
    const itemData = {
        apiID: result.objectID,
        title: result.title,
        url: result.primaryImage,
        artist: result.artistDisplayName
    }

    return (
        <div className='SearchResultCard'>
            <div>{itemData.apiID}</div>
            <div>{itemData.title}
            {itemData.artist !== '' ?  ` by  ${itemData.artist}` : ''}
            </div>
            <img src={result.primaryImage} alt={result.title}></img>
            <div><button onClick={() => addItem(itemData)}>add to board</button></div>
        </div>
    )
}