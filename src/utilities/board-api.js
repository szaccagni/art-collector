import sendRequest from './send-request';

const BASE_URL = '/api/boards'

export async function addBoard(board) {
    return sendRequest(`${BASE_URL}`, 'POST', {board})
} 

export async function getBoards() {
    return sendRequest(`${BASE_URL}`);    
}