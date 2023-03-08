const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1'

export async function search(term) {
    let endpoint = `${BASE_URL}/search?hasImages=true&q=${term}`
    let response = await fetch(endpoint).then((res) => res.json());
    return response.objectIDs
}

export async function getArrDetails(objectIDs, curPg, resultsPerPg) {
    const removeIds = []
    const start = (curPg * resultsPerPg) - resultsPerPg
    const results = []
    let count = 0
    while (results.length < resultsPerPg) {
        const id = objectIDs[(start+count)]
        const details = await getObjDetails(id)
        if (details.primaryImage !== '') {
            results.push(details)
        } else {
            removeIds.push(id)
        }
        count += 1
    }
    removeIds.forEach(el => {
        const idx = objectIDs.indexOf(el)
        objectIDs.splice(idx, 1)
    })
    return {results, objectIDs}
}

export async function getObjDetails(id) {
    let endpoint = `${BASE_URL}/objects/${id}`
    let response = await fetch(endpoint).then((res) => res.json());
    return response
}