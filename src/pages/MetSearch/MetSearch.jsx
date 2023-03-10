import './MetSearch.css'
import {useState} from 'react'
import * as metAPI from '../../utilities/met-api'
import SearchResults from '../../components/SearchResults/SearchResults'
import Pagination from '../../components/Pagination/Pagination'

export default function MetSearch({addItem}) {
    const [search, setSearch] = useState('')
    const [curSearch, setCurSearch] = useState('')
    const [resultIDs, setResultIDs] = useState([])
    const [curData, setCurData] = useState([])
    const [curPg, setCurPg] = useState(1)
    const [resultsPerPg, setResultsPerPg] = useState(12)
    
    async function handleSearch() {
        setCurSearch(search)
        setCurPg(1)
        const res = await metAPI.search(search)
        const data = await metAPI.getArrDetails(res, curPg, resultsPerPg)
        setResultIDs(data.objectIDs)
        setCurData(data.results)
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
            </div>
            { curSearch && 
            <>
                <div className='met-search-text'><span>showing results for <span className='bold'>{curSearch}</span></span></div>
                <SearchResults curData={curData} curPg={curPg} addItem={addItem}/>
                <Pagination curPg={curPg} handlePageChange={handlePageChange} resultIDs={resultIDs} resultsPerPg={resultsPerPg}/>
            </> }
        </div>
    )
}