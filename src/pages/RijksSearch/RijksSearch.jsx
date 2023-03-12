import './RijksSearch.css'
import {useState} from 'react'
import * as rijksAPI from '../../utilities/rijks-api'
import SearchResults from '../../components/SearchResults/SearchResults'
import RijksPagination from '../../components/Pagination/RijksPagination'

export default function RijksSearch({addItem}) {
    const [search, setSearch] = useState('')
    const [resultsPerPg, setResultsPerPg] = useState(20)
    const [curPg, setCurPg] = useState(1)
    const [curSearch, setCurSearch] = useState('')
    const [curData, setCurData] = useState([])
    const [totalResults, setTotalResults] = useState(0)

    async function handleSearch() {
        setCurSearch(search)
        setCurPg(1)
        handleSearchResults(search)
        setSearch("")
    }

    async function handleSearchResults(term) {
        const res = await rijksAPI.search(term,resultsPerPg,curPg)
        setCurData(res.curData)
        setTotalResults(res.totalCount)
    }

    async function handlePageTurn(pg) {
        const res = await rijksAPI.search(curSearch,resultsPerPg,pg)
        setCurData(res.curData)
        setTotalResults(res.totalCount)
        setCurPg(pg)
    }

    return (
        <div className='rijks-search-container'>
            <div className='rijks-search-bar-container'>
                <div><img src='/Rijksmuseum_Logo.png' alt='rijks logo'></img></div>
                <div className='rijks-search-bar flex-container'>
                    <input
                        value={search} 
                        onChange={ e => setSearch(e.target.value)}
                        required
                    ></input>
                    <button className='btn' onClick={handleSearch}>general search</button>
                </div>
            </div>
            { curSearch && 
            <>
                <div className='rijks-search-text'><span>showing results for <span className='bold'>{curSearch}</span></span></div>
                <SearchResults curData={curData} curPg={curPg} addItem={addItem}/>
                <RijksPagination curPg={curPg} totalResults={totalResults} resultsPerPg={resultsPerPg} handlePageTurn={handlePageTurn}/>
            </> }
        </div>
    )
}