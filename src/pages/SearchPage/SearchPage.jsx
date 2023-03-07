import {useState, useEffect} from 'react'
import * as metAPI from '../../utilities/met-api'
import SearchResults from '../../components/SearchResults/SearchResults'
import Pagination from '../../components/Pagination/Pagination'

export default function SearchPage() {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState({
        total : 0,
        curData: [],
        curPg: 1,
        resultsPerPg : 12,
        curSearch: ''
    })

    async function handleSearch() {
        const res = await metAPI.search(search, 0, results.resultsPerPg)
        const newResults = {
            ...results, 
            total : res.total,
            curData : res.curData,
            curPg: 1,
            curSearch: search
        }
        setResults(newResults)
        setSearch("");
    }

    useEffect(function() {
        async function getResults() {
            const res = await metAPI.search(results.curSearch, ((results.resultsPerPg * results.curPg) - results.resultsPerPg), results.resultsPerPg)
            const newResults = {
                ...results, 
                curData : res.curData,
            }
            setResults(newResults)
        }
        getResults()
    }, [results.curPg])
    
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
                    <SearchResults results={results}/> 
                    <Pagination results={results} setResults={setResults}/>
                </>
                : 
                <div>search for art!</div>
            }
        </>
    )
}