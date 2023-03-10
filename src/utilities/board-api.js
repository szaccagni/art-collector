import sendRequest from './send-request';

const BASE_URL = '/api/boards'

export async function addItem(boardId, item) {
    return sendRequest(`${BASE_URL}/${boardId}/items`, 'POST', {item})
}

export async function removeItem(itemId) {
    return sendRequest(`/api/items/${itemId}`, 'DELETE')
}

export async function updateBoard(boardId, board) {
    return sendRequest(`${BASE_URL}/${boardId}`, 'PUT', {board})
}

export async function addBoard(board) {
    return sendRequest(`${BASE_URL}`, 'POST', {board})
} 

export async function getBoards() {
    return sendRequest(`${BASE_URL}`);    
}

export async function deleteBoard(boardId) {
    return sendRequest(`${BASE_URL}/${boardId}`, 'DELETE')
}