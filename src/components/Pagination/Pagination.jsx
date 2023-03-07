export default function Pagination({totalResults,resultsPerPage,setStart,setCurPage,curPage}) {
    let totalPages = Math.ceil(totalResults / resultsPerPage)
    let pages = []
    const stop = totalPages < 11 ? totalPages : 11
    for (let i = 1; i < stop; i++) {
        pages.push(i)
    }

    function handleClick(pg) {
        setStart((resultsPerPage * pg) - resultsPerPage)
        setCurPage(pg)
    }

    return (
        <div>
            {pages.map( page => <button>{page}</button>)}
            {totalPages > 10 ? 
            <><span> ... </span><button>{totalPages}</button></>
            : ''}
        </div>
    )
}