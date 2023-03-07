import {useState} from 'react'
import * as metAPI from '../../utilities/met-api'
import SearchResults from '../../components/SearchResults/SearchResults'
import Pagination from '../../components/Pagination/Pagination'

export default function SearchPage() {
    const [search, setSearch] = useState('')
    const [resultsFor, setResultsfor] = useState('')
    const [results, setResults] = useState({total: 0, arr: []})
    const [curPage, setCurPage] = useState(1)
    const [resultsPerPage, setResultsPerPage] = useState(12)
    const [start, setStart] = useState(0)

    async function handleSearch() {
        const res = await metAPI.search(search, start, resultsPerPage)
        setResults(res)
        setResultsfor(search)
        setSearch("");
    }
    
    return( 
        <>
            <input 
                value={search} 
                onChange={ e => setSearch(e.target.value)}
                required
            ></input> 
            <button onClick={handleSearch}>search</button>
            { results.total > 0 ? 
                <>
                    <SearchResults results={results.arr} resultsFor={resultsFor}/> 
                    <Pagination 
                        totalResults={results.total} 
                        resultsPerPage={resultsPerPage} 
                        setStart={setStart}
                        setCurPage={setCurPage} 
                        curPage={curPage}
                    />
                </>
                : 
                <div>search for art!</div>
            }
        </>
    )
}