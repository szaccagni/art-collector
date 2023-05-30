import './RijksSearch.css'
import {useState} from 'react'
import * as rijksAPI from '../../utilities/rijks-api'
import SearchResults from '../../components/SearchResults/SearchResults'
import Pagination from '../../components/Pagination/Pagination'

export default function RijksSearch({addItem, quickAddItem}) {
    const [search, setSearch] = useState('')
    const [resultsPerPg, setResultsPerPg] = useState(20) // used for to calc total pgs in pagination
    const [curPg, setCurPg] = useState(1)
    const [curSearch, setCurSearch] = useState('')
    const [curData, setCurData] = useState([])
    const [totalResults, setTotalResults] = useState(0) // used for to calc total pgs in pagination
    const [noResults, setNoResults] = useState(false)

    async function handleSearch() {
        setCurSearch(search)
        setCurPg(1)
        handleSearchResults(search)
        setSearch("")
    }

    async function handleSearchResults(term) {
        const res = await rijksAPI.search(term,resultsPerPg,curPg)
        if (res.totalCount === 0) {
            setNoResults(true)
        } else {
            setCurData(res.curData)
            setTotalResults(res.totalCount)
        }
    }

    async function handlePageTurn(pg) {
        setCurData([])
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
                <SearchResults curData={curData} addItem={addItem} noResults={noResults} quickAddItem={quickAddItem}/>
                <Pagination curPg={curPg} resultsLen={totalResults} resultsPerPg={resultsPerPg} handlePageTurn={handlePageTurn}/>
            </> }
        </div>
    )
}