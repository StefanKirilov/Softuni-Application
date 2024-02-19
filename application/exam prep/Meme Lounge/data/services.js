import {post, get, put, del} from './api.js';

export async function getAllMemes() {
    return get('/data/memes?sortBy=_createdOn%20desc');
}

export async function createMeme(album) {
    return post('/data/memes', album);
}

export async function getMyMemes(userId) {
    return get(`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function getMemeById(id) {
    return get(`/data/memes/${id}`);
}

// // export async function donatePet(petId) {
// //     return post('/data/donation', {petId});
// // }

// // export async function getTotalDonatePet(petId) {
// //     return get(`/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);
// // }

// // export async function getTotalDonatePetFromUser(petId, userId) {
// //     return get(`/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
// // }

export async function deleteMeme(id) {
    return del(`/data/memes/${id}`);
}

export async function editMeme(id, meme){
    return put(`/data/memes/${id}`, meme)
}

// export async function searchAlbum(query){
//     // return get('/data/albums?where=name'+ encodeURIComponent(` LIKE "${query}"`));
//     return get(`/data/albums?where=name%20LIKE%20%22${query}%22`);
// }


// // /data/albums?where=name%20LIKE%20%22${query}%22