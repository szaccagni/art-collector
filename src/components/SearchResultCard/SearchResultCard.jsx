import './SearchResultCard.css'
export default function SearchResultCard({result}) {
    return (
        <div className='SearchResultCard'>
            <div>{result.title}</div>
            <img src={result.primaryImage}></img>
        </div>
    )
}