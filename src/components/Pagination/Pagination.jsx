import { useState, useEffect } from 'react'

export default function Pagination({results, setResults}) {
    const [pageNums, setPageNums] = useState([])
    
    const curPg = results.curPg
    const totalPgs = Math.ceil(results.total / results.resultsPerPg)

    useEffect( () => {
        const pageNumSet = []
        
        if (totalPgs <= 10) {
            for (let i = 1; i <= totalPgs; i++) {
                pageNumSet.push(i)
            }
        } else if (curPg <= 6) {
            for (let i = 1; i <= 10; i++) {
                pageNumSet.push(i)
            }   
        } else if (curPg > 6 && ((curPg + 4) < totalPgs)) { 
            for (let i = curPg - 4; i < curPg + 5; i++) {
                pageNumSet.push(i)
            }
        } else if (curPg + 4 > totalPgs) {
            for (let i = curPg - 9; i <= totalPgs; i++) {
                pageNumSet.push(i)
            }
        }
        setPageNums(pageNumSet)
    }, [curPg, totalPgs]) 

    function handlePgChange(num) {
        const newCurPg = curPg + num
        const newResults = {
            ...results, 
            curPg : newCurPg
        }
        setResults(newResults)
    }

    function handleDirectPgChange(num) {
        const newResults = {
            ...results, 
            curPg : num
        }
        setResults(newResults)
    }
    
    return (
        <div>
            {results.curPg > 1 ? <button onClick={() => handlePgChange(-1)}>previous</button> : ''}
            {pageNums.map( (num, idx) => <button key={idx} onClick={() => handleDirectPgChange(num)} >{num}</button>)}
            { totalPgs > pageNums[pageNums.length - 1] ?
                <><span> ... </span> <button>{totalPgs}</button></>
                : ''}
            {results.curPg < pageNums[pageNums.length - 1] ? <button onClick={() => handlePgChange(1)}>next</button> : '' }
        </div>
    )
}