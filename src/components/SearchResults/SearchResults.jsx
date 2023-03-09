import './SearchResults.css'
import SearchResultCard from '../SearchResultCard/SearchResultCard'

export default function SearchReults({curSearch, curData, addItem}) {
    return ( 
        <>
            <div>showing results for <b>{curSearch}</b></div>
            <div className='SearchResults'>
                {curData.map(( result, idx) => <SearchResultCard result={result} key={idx} addItem={addItem}/>)}
            </div>   
        </>   
    )
}