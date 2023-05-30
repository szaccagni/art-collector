import './MetSearch.css'
import {useState} from 'react'
import * as metAPI from '../../utilities/met-api'
import SearchResults from '../../components/SearchResults/SearchResults'
import Pagination from '../../components/Pagination/Pagination'

export default function MetSearch({addItem, quickAddItem}) {
    const [resultsPerPg, setResultsPerPg] = useState(20) // used for to calc total pgs in pagination
    const [search, setSearch] = useState('')
    const [curSearch, setCurSearch] = useState('')
    const [resultIDs, setResultIDs] = useState([]) // needed for subsequent api call to get data
    const [curData, setCurData] = useState([])
    const [curPg, setCurPg] = useState(1)
    const [noResults, setNoResults] = useState(false)
    const [resultsLen, setResultsLen] = useState(0) // used for to calc total pgs in pagination


    async function handleSearch() {
        setCurData([])
        setCurSearch(search)
        setCurPg(1)
        setSearch("")
        setNoResults(false)
        setResultsLen(0)
        const res = await metAPI.search(search)
        await handleSearchResults(res)
    }

    async function handleFilterSearch(text, filter) {
        setCurSearch(`${search} (${text})`)
        setCurPg(1)
        setSearch("")
        const res = await metAPI.filterSearch(filter, search)
        await handleSearchResults(res)         
    }

    async function handleSearchResults(res) {
        if (res) {
            const data = await metAPI.getArrDetails(res, 1, resultsPerPg) // objIDs, curPg, resultsPerPg
            setResultIDs(data.objectIDs)
            setResultsLen(data.objectIDs.length)
            setCurData(data.results)
        } else {
            setNoResults(true)
            setCurPg(1)
        }
    }

    async function handlePageTurn(num) {
        setCurData([])
        const data = await metAPI.getArrDetails(resultIDs, num, resultsPerPg) // objIDs, curPg, resultsPerPg
        setResultIDs(data.objectIDs)
        setResultsLen(data.objectIDs.length)
        setCurData(data.results)
        setCurPg(num)
    }

    return( 
        <div className='met-search-container'>
            <div className='met-search-bar'>
                <div className='met-search-title'><img src='/met-logo.jpeg' alt='met logo'></img></div>
                <div className='met-search-input'>
                    <div className='met-search'>
                        <input 
                        value={search} 
                        onChange={ e => setSearch(e.target.value)}
                        required
                    ></input> 
                    </div>
                    <div className='met-search-buttons'>
                        <button className='btn' onClick={handleSearch}>general search</button>
                        <button className='btn'onClick={() => handleFilterSearch('highlights only', 'isHighlight')}>search highlights</button>
                        <button className='btn'onClick={() => handleFilterSearch('titles only', 'title')}>search titles</button>
                        <button className='btn'onClick={() => handleFilterSearch('artists and culture only', 'artistOrCulture')}>search artists and culture</button>
                        <button className='btn'onClick={() => handleFilterSearch('art on view only', 'isOnView')}>search art on view</button>
                    </div>
                </div>
            </div>
            <div className='met-search-text-container'>
                { curSearch && <div className='met-search-text'><span>showing results for <span className='bold'>{curSearch}</span></span></div>}
            </div>

            
            { curSearch && 
            <>
                <SearchResults curData={curData} addItem={addItem} noResults={noResults} quickAddItem={quickAddItem}/>
                <Pagination curPg={curPg} handlePageTurn={handlePageTurn} resultsLen={resultsLen} resultsPerPg={resultsPerPg}/>
            </> }
        </div>
    )
}