import './SearchResultCard.css'
export default function SearchResultCard({result, addItem}) {
    const itemData = {
        title: result.title,
        url: result.primaryImage
    }

    return (
        <div className='SearchResultCard'>
            <div>{result.objectID}</div>
            <div>{result.title}</div>
            <img src={result.primaryImage} alt={result.title}></img>
            <div><button onClick={() => addItem(itemData)}>add to board</button></div>
        </div>
    )
}