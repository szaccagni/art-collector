import sendRequest from './send-request';

const BASE_URL = '/api/rijks'

export async function search(term, resultsPerPg, curPg) {
    return sendRequest(`${BASE_URL}/${term}/${resultsPerPg}/${curPg}`)
}