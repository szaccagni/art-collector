import './MetSearch.css'
import {useState} from 'react'
import * as metAPI from '../../utilities/met-api'
import SearchResults from '../../components/SearchResults/SearchResults'
import Pagination from '../../components/Pagination/Pagination'

export default function MetSearch({addItem}) {
    const [resultsPerPg, setResultsPerPg] = useState(20)
    const [search, setSearch] = useState('')
    const [curSearch, setCurSearch] = useState('')
    const [resultIDs, setResultIDs] = useState([])
    const [curData, setCurData] = useState([])
    const [curPg, setCurPg] = useState(1)
    
    const resultsLen = resultIDs.length

    async function handleSearch() {
        setCurSearch(search)
        setCurPg(1)
        const res = await metAPI.search(search)
        await handleSearchResults(res) 
    }

    async function handleFilterSearch(text, filter) {
        setCurSearch(`${search} (${text})`)
        setCurPg(1)
        const res = await metAPI.filterSearch(filter, search)
        await handleSearchResults(res)         
    }

    async function handleSearchResults(res) {
        const data = await metAPI.getArrDetails(res, curPg, resultsPerPg)
        setResultIDs(data.objectIDs)
        setCurData(data.results)
        setCurPg(1)
        setSearch("");
    }

    async function handlePageChange(num) {
        console.log('handle pg turn')
        const data = await metAPI.getArrDetails(resultIDs, num, resultsPerPg)
        setResultIDs(data.objectIDs)
        setCurData(data.results)
        setCurPg(num)
    }

    return( 
        <div className='met-search-container'>
            <div className='met-search-bar flex-container'>
                <div className='met-search-title'><img src='/met-logo.jpeg' alt='met logo'></img></div>
                <div>
                    <div className='met-search-text-container'>
                        { curSearch && <div className='met-search-text'><span>showing results for <span className='bold'>{curSearch}</span></span></div>}
                    </div>
                    <div className='met-search-bar-form'>
                        <input 
                            value={search} 
                            onChange={ e => setSearch(e.target.value)}
                            required
                        ></input> 
                        <button className='btn' onClick={handleSearch}>general search</button>
                        <button className='btn'onClick={() => handleFilterSearch('highlights only', 'isHighlight')}>search highlights</button>
                        <button className='btn'onClick={() => handleFilterSearch('titles only', 'title')}>search titles</button>
                        <button className='btn'onClick={() => handleFilterSearch('artists and culture only', 'artistOrCulture')}>search artists and culture</button>
                        <button className='btn'onClick={() => handleFilterSearch('art on view only', 'isOnView')}>search art on view</button>
                    </div>
                </div>

            </div>

            
            { curSearch && 
            <>
                <SearchResults curData={curData} curPg={curPg} addItem={addItem}/>
                <Pagination curPg={curPg} handlePageChange={handlePageChange} resultsLen={resultsLen} resultsPerPg={resultsPerPg}/>
            </> }
        </div>
    )
}