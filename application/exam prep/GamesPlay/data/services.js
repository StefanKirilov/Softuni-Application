import {post, get, put, del} from './api.js';

export async function getAllGames() {
    return get('/data/games?sortBy=_createdOn%20desc');
}

export async function getHomeGames() {
    return get('/data/games?sortBy=_createdOn%20desc&distinct=category');
}

export async function createGame(game) {
    return post('/data/games', game);
}

export async function getByGameId(gameId) {
    return get(`/data/comments?where=gameId%3D%22${gameId}%22`);
}

export async function getGameById(id) {
    return get(`/data/games/${id}`);
}

export async function postComment(data) {
    return post(`/data/comments`, data);
}

// export async function donatePet(petId) {
//     return post('/data/donation', {petId});
// }

// export async function getTotalDonatePet(petId) {
//     return get(`/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);
// }

// export async function getTotalDonatePetFromUser(petId, userId) {
//     return get(`/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
// }

export async function deleteGame(id) {
    return del(`/data/games/${id}`);
}

export async function editGame(id, game){
    return put(`/data/games/${id}`, game)
}