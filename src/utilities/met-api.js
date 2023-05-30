import sendRequest from './send-request';

const BASE_URL = '/api/met'

export async function search(term) {
    return sendRequest(`${BASE_URL}/${term}`)
}

export async function filterSearch(filter, term) {
    return sendRequest(`${BASE_URL}/filter/${filter}/${term}`)
}

// logic to get and format data to be returned to the search results pg
export async function getArrDetails(objectIDs, curPg, resultsPerPg) {
    const totalPages = Math.ceil(objectIDs.length / resultsPerPg)
    const removeIds = []
    const start = (curPg * resultsPerPg) - resultsPerPg
    const results = []
    let count = 0
    // last page should only interate over the number of items left
    // this could be less than resultsPerPage
    if (curPg === totalPages) {
        for (let i = 0; i < (objectIDs.length - start); i++) {
            // start at relavent index of obj IDs arr
            const id = objectIDs[(start+i)]
            const details = await getObjDetails(id)
            // we only want data with an image
            if (details.primaryImage !== '' && details.primaryImage) {
                results.push(details)
            } else {
                removeIds.push(id)
            }            
        }
    // logic if we are on anything but the last page 
    } else if ( curPg < totalPages) {
        while (results.length < resultsPerPg && ((start+count) < objectIDs.length)) {
            const id = objectIDs[(start+count)]
            const details = await getObjDetails(id)
            if (details.primaryImage !== '' && details.primaryImage) {
                results.push(details)
            } else {
                removeIds.push(id)
            }
            count += 1
        }
    }
    // clean up obj IDs arr
    removeIds.forEach(el => {
        const idx = objectIDs.indexOf(el)
        objectIDs.splice(idx, 1)
    })
    return {results, objectIDs}
}

export async function getObjDetails(id) {
    return sendRequest(`${BASE_URL}/objects/${id}`)
}