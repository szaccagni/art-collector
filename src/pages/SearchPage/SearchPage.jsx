import {useState} from 'react'
import * as metAPI from '../../utilities/met-api'
import SearchResults from '../../components/SearchResults/SearchResults'
import Pagination from '../../components/Pagination/Pagination'

export default function SearchPage() {
    const [search, setSearch] = useState('')
    const [curSearch, setCurSearch] = useState('')
    const [resultIDs, setResultIDs] = useState([])
    const [curData, setCurData] = useState([])
    const [curPg, setCurPg] = useState(1)
    const [resultsPerPg, setResultsPerPg] = useState(12)
    
    async function handleSearch() {
        setCurSearch(search)
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
        <>
            <input 
                value={search} 
                onChange={ e => setSearch(e.target.value)}
                required
            ></input> 
            <button onClick={handleSearch}>search</button>
            { curSearch && 
            <>
                <SearchResults curSearch={curSearch} curData={curData} curPg={curPg}/>
                <Pagination curPg={curPg} handlePageChange={handlePageChange} resultIDs={resultIDs} resultsPerPg={resultsPerPg}/>
            </> }
        </>
    )
}