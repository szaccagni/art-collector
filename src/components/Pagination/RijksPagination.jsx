import './Pagination.css'
import {useState, useEffect} from 'react'
export default function RijksPagination({curPg, totalResults, resultsPerPg, handlePageTurn}) {
    const totalPages = Math.ceil(totalResults / resultsPerPg)
    const [pages, setPages] = useState(generatePages())

    function generatePages() {
        const pgs = []
        for (let i = (curPg-2); i <= (curPg+2); i++) {
            if (i <= totalPages && i > 0) pgs.push(i)
        }        
        console.log(pgs)
        return pgs
    }

    useEffect( function () {
        setPages(generatePages())
    }, [totalResults, curPg])

    return (
        <div className='pagination-container'>
            {pages.length ? 
                <>
                {curPg !== 1 ? 
                    <>
                        <button onClick={() => handlePageTurn(1)}>First</button>
                        <button onClick={() => handlePageTurn(curPg-1)}>Previous</button>
                    </>
                : '' }             
                {pages.map( (pg, idx) => 
                    <button className={ pg === curPg ? 'pagination-active-btn' : ''} key={idx} onClick={() => handlePageTurn(pg)}>{pg}</button>
                )}
                {curPg !== totalPages ? 
                    <>
                        <button onClick={() => handlePageTurn(curPg+1)}>Next</button>
                        <button  onClick={() => handlePageTurn(totalPages)}>Last</button>
                    </>
                : ''}
                </>
            : ''}
        </div>
    )

    }