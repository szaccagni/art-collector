import './SearchResults.css'
import SearchResultCard from '../SearchResultCard/SearchResultCard'

export default function SearchReults({results}) {
    return ( 
        <>
            <div>showing results for <b>{results.curSearch}</b></div>
            <div className='SearchResults'>{results.curData.map((result,idx) => <SearchResultCard key={idx} result={result}/>)}</div>   
        </>   
    )
}