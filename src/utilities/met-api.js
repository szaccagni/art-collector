const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1'

export async function search(term, start, resultsPerPage) {
    console.log(term,start,resultsPerPage)
    let endpoint = `${BASE_URL}/search?hasImages=true&q=${term}`
    let response = await fetch(endpoint).then((res) => res.json());
    let arr = []
    let count = 0
    while (arr.length < resultsPerPage) {
        const details = await getObjDetails(response.objectIDs[start+count])
        if (details.primaryImage !== '') arr.push(details)
        count += 1
    } 
    const result = {total: response.total, curData: arr}
    return result
}

export async function getAllDetails(arr) {
    const results = await Promise.all(arr.map(el => getObjDetails(el)))
    return results
}

export async function getObjDetails(id) {
    let endpoint = `${BASE_URL}/objects/${id}`
    let response = await fetch(endpoint).then((res) => res.json());
    return response
}