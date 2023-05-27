import sendRequest from './send-request';

const BASE_URL = '/api/met'

export async function search(term) {
    return sendRequest(`${BASE_URL}/${term}`)
}

export async function filterSearch(filter, term) {
    return sendRequest(`${BASE_URL}/filter/${filter}/${term}`)
}

export async function getArrDetails(objectIDs, curPg, resultsPerPg) {
    const totalPages = Math.ceil(objectIDs.length / resultsPerPg)
    const removeIds = []
    const start = (curPg * resultsPerPg) - resultsPerPg
    const results = []
    let count = 0
    if (curPg === totalPages) {
        for (let i = 0; i < (objectIDs.length - start); i++) {
            const id = objectIDs[(start+i)]
            const details = await getObjDetails(id)
            if (details.primaryImage !== '' && details.primaryImage) {
                results.push(details)
            } else {
                removeIds.push(id)
            }            
        }
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
    removeIds.forEach(el => {
        const idx = objectIDs.indexOf(el)
        objectIDs.splice(idx, 1)
    })
    return {results, objectIDs}
}

export async function getObjDetails(id) {
    return sendRequest(`${BASE_URL}/objects/${id}`)
}