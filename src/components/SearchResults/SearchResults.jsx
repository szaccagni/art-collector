import './SearchResults.css'
import SearchResultCard from '../SearchResultCard/SearchResultCard'

export default function SearchReults({curData, addItem}) {
    return ( 
        <>
            <div className='SearchResults'>
                {curData.map(( result, idx) => <SearchResultCard result={result} key={idx} addItem={addItem}/>)}
            </div>   
        </>   
    )
}