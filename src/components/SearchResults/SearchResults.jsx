import './SearchResults.css'
import SearchResultCard from '../SearchResultCard/SearchResultCard'

export default function SearchReults({curData, addItem, noResults, quickAddItem}) {
    return ( 
        <>
            <div className='search-results'>
                {noResults ? <div className='search-results-loading'>no results found</div> : ''}
                {curData.length ? 
                    <>
                        {curData.map((result, idx) => <SearchResultCard result={result} key={idx} addItem={addItem} quickAddItem={quickAddItem}/>)}
                    </>
                : 
                    <>
                        {noResults ? '': <div className='search-results-loading'>results loading...</div>}
                    </> 
                }
            </div>   
        </>   
    )
}