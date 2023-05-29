const token = process.env.REACT_APP_RIJKS_API_KEY
const BASE_URL = `https://www.rijksmuseum.nl/api/en/collection?key=${token}&imgonly=true`

module.exports = {
    search
}

// async function search(req, res) {
//     let endpoint = `${BASE_URL}&q=${req.params.term}&ps=${req.params.resultsPerPg}&p=${req.params.curPg}`
//     let response = await fetch(endpoint).then((res) => res.json());
//     const curData = response.artObjects.map( art => {
//         const formatData = {
//             objectID: art.objectNumber,
//             title: art.title,
//             primaryImage: art.webImage.url,
//             artistDisplayName: art.principalOrFirstMaker
//         }
//         return formatData
//     }) 
//     res.json( {curData:curData, totalCount:response.count} )
// }

async function search(req, res) {
    let endpoint = `${BASE_URL}&q=${req.params.term}&ps=${req.body.resultsPerPg}&p=${req.body.curPg}`
    let response = await fetch(endpoint).then((res) => res.json());
    const curData = response.artObjects.map( art => {
        const formatData = {
            objectID: art.objectNumber,
            title: art.title,
            primaryImage: art.webImage.url,
            artistDisplayName: art.principalOrFirstMaker
        }
        return formatData
    }) 
    res.json( {curData:curData, totalCount:response.count} )
}