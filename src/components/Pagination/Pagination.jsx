import './Pagination.css'
import { useState , useEffect } from 'react'

export default function Pagination({curPg, handlePageChange, resultsLen, resultsPerPg}) {

    const totalPgs = Math.ceil(resultsLen / resultsPerPg)
    const pgs = totalPgs > 11 ? 11 : totalPgs

    const [pages, setPages] = useState(generatePages(curPg))

    useEffect(function() {
        setPages(generatePages(curPg))
    }, [resultsLen])

    function generatePages(pg) {
        const pageArr = Array.from( {length: pgs }, 
            (v, i) => {
                if (i === 0) {
                    return i + 1
                } else if (totalPgs <= 11) {
                    return i + 1
                } else if (i === 10) {
                    return totalPgs
                } else if (pg < 7) {
                    return i + 1 
                } else if (i < 5) {
                    return pg - i
                } else if (i === 5) {
                    return pg
                } else if (i === 6) {
                    return pg + 1
                } else if (i === 7) {
                    return pg + 2
                } else if (i === 8) {
                    return pg + 3
                } else if (i === 9) {
                    return pg + 4
                }
            }
        )
        pageArr.sort((a, b) => a - b)
        return pageArr
    }

    function handleClick(num) {
        setPages(generatePages(num))
        handlePageChange(num)
    }
    
    return (
        <div className='pagination-container'>
            {pages.length ?
                <>
                {curPg === 1 ? '' : <button>previous</button>}
                {pages.map( (page, idx) => 
                    <button className={ page === curPg ? 'pagination-active-btn' : ''} key={idx} onClick={() => handleClick(page)}>{page}</button>
                )}
                {curPg === totalPgs ? '' : <button>next</button>}
                </>
                : ''
            }
        </div>
    )
}