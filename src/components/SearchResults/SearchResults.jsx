import './SearchResults.css'
import SearchResultCard from '../SearchResultCard/SearchResultCard'

export default function SearchReults({curData, addItem}) {
    return ( 
        <>
            <div className='search-results'>
                {curData.length ? 
                    <>
                        {curData.map(( result, idx) => <SearchResultCard result={result} key={idx} addItem={addItem}/>)}
                    </>
                :  <div className='search-results-loading' >results loading...</div>
                }
            </div>   
        </>   
    )
}