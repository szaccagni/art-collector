const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1'

module.exports = {
    search,
    filterSearch,
    getObjDetails
}

async function search(req, res) {
    let endpoint = `${BASE_URL}/search?hasImages=true&q=${req.params.term}`
    let response = await fetch(endpoint).then((res) => res.json());
    res.json(response.objectIDs)
}

async function filterSearch(req, res) {
    let endpoint = `${BASE_URL}/search?${req.params.filter}=true&hasImages=true&q=${req.params.term}`
    let response = await fetch(endpoint).then((res) => res.json());
    res.json(response.objectIDs)
}

// async function getArrDetails(objectIDs, curPg, resultsPerPg) {
//     const totalPages = Math.ceil(objectIDs.length / resultsPerPg)
//     const removeIds = []
//     const start = (curPg * resultsPerPg) - resultsPerPg
//     const results = []
//     let count = 0
//     if (curPg === totalPages) {
//         for (let i = 0; i < (objectIDs.length - start); i++) {
//             const id = objectIDs[(start+i)]
//             const details = await getObjDetails(id)
//             if (details.primaryImage !== '' && details.primaryImage) {
//                 results.push(details)
//             } else {
//                 removeIds.push(id)
//             }            
//         }
//     } else if ( curPg < totalPages) {
//         while (results.length < resultsPerPg && ((start+count) < objectIDs.length)) {
//             const id = objectIDs[(start+count)]
//             // console.log((start+count), objectIDs.length)
//             const details = await getObjDetails(id)
//             if (details.primaryImage !== '' && details.primaryImage) {
//                 results.push(details)
//             } else {
//                 removeIds.push(id)
//             }
//             count += 1
//         }
//     }
//     removeIds.forEach(el => {
//         const idx = objectIDs.indexOf(el)
//         objectIDs.splice(idx, 1)
//     })
//     return {results, objectIDs}
// }

async function getObjDetails(req, res) {
    let endpoint = `${BASE_URL}/objects/${req.params.id}`
    let response = await fetch(endpoint).then((res) => res.json());
    res.json(response)
}