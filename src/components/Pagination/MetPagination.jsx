import './Pagination.css'
import { useState , useEffect } from 'react'

export default function MetPagination({curPg, handlePageTurn, resultsLen, resultsPerPg}) {

    const totalPages = Math.ceil(resultsLen / resultsPerPg)
    const [pages, setPages] = useState(generatePages())

    function generatePages() {
        const pgs = []
        for (let i = (curPg-3); i <= (curPg+3); i++) {
            if (i <= totalPages && i > 0) pgs.push(i)
        }        
        return pgs
    }

    useEffect(function() {
        setPages(generatePages(curPg))
    }, [resultsLen, curPg])

    function handleClick(pg) {
        setPages([])
        handlePageTurn(pg)
    }
    
    return (
        <div className='pagination-container'>
            {pages.length ? 
                <>
                {curPg !== 1 ? 
                    <>
                        <button onClick={() => handleClick(1)}>First</button>
                        <button onClick={() => handleClick(curPg-1)}>Previous</button>
                    </>
                : '' }             
                {pages.map( (pg, idx) => 
                    <button className={ pg === curPg ? 'pagination-active-btn' : ''} key={idx} onClick={() => handleClick(pg)}>{pg}</button>
                )}
                {curPg !== totalPages ? 
                    <>
                        <button onClick={() => handleClick(curPg+1)}>Next</button>
                        <button  onClick={() => handleClick(totalPages)}>Last</button>
                    </>
                : ''}
                <div className='pagination-results'>({resultsLen} total results)</div>
                </>
            : ''}
        </div>
    )
}