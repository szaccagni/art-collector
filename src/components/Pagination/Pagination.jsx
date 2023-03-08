export default function Pagination({curPg, handlePageChange, resultIDs, resultsPerPg}) {
    const pages = [1,2,3,4,5,6,7,8,9,10]    
    
    return (
        <div>
            {pages.map( (page, idx) => <button key={idx} onClick={() => handlePageChange(page)}>{page}</button>)}
        </div>
    )
}