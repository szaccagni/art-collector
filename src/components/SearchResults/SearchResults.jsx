import './SearchResults.css'
import SearchResultCard from '../SearchResultCard/SearchResultCard'

export default function SearchReults({results, resultsFor}) {
    return ( 
        <>
            <div>showing results for <b>{resultsFor}</b></div>
            <div className='SearchResults'>{results.map((result,idx) => <SearchResultCard kye={idx} result={result}/>)}</div>   
        </>   
    )
}