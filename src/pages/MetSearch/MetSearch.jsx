import './MetSearch.css'
import {useState} from 'react'
import * as metAPI from '../../utilities/met-api'
import SearchResults from '../../components/SearchResults/SearchResults'
import Pagination from '../../components/Pagination/Pagination'

export default function MetSearch({addItem}) {
    const [resultsPerPg, setResultsPerPg] = useState(12)
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

    async function handleHighlightsSearch() {
        setCurSearch(`${search} (highlights only)`)
        setCurPg(1)
        const res = await metAPI.filterSearch('isHighlight', search)
        await handleSearchResults(res) 
    }
    
    async function handleTitlesSearch() {
        setCurSearch(`${search} (titles only)`)
        setCurPg(1)
        const res = await metAPI.filterSearch('title', search)
        await handleSearchResults(res) 
    }

    async function handleArtistCultureSearch() {
        setCurSearch(`${search} (artists and culture only)`)
        setCurPg(1)
        const res = await metAPI.filterSearch('artistOrCulture', search)
        await handleSearchResults(res) 
    }

    async function handleOnViewSearch() {
        setCurSearch(`${search} (art on view only)`)
        setCurPg(1)
        const res = await metAPI.filterSearch('isOnView', search)
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
                <input 
                    value={search} 
                    onChange={ e => setSearch(e.target.value)}
                    required
                ></input> 
                <button className='btn' onClick={handleSearch}>general search</button>
                <button className='btn'onClick={handleHighlightsSearch}>search highlights</button>
                <button className='btn'onClick={handleTitlesSearch}>search titles</button>
                <button className='btn'onClick={handleArtistCultureSearch}>search artists and culture</button>
                <button className='btn'onClick={handleOnViewSearch}>search art on view</button>
            </div>
            { curSearch && 
            <>
                <div className='met-search-text'><span>showing results for <span className='bold'>{curSearch}</span></span></div>
                <SearchResults curData={curData} curPg={curPg} addItem={addItem}/>
                <Pagination curPg={curPg} handlePageChange={handlePageChange} resultsLen={resultsLen} resultsPerPg={resultsPerPg}/>
            </> }
        </div>
    )
}