import {post, get, put, del} from './api.js';

export async function getAllAlbums() {
    return get('/data/albums?sortBy=_createdOn%20desc&distinct=name');
}

export async function createAlbum(album) {
    return post('/data/albums', album);
}

// // export async function getMyBooks(userId) {
// //     return get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
// // }

export async function getAlbumById(id) {
    return get(`/data/albums/${id}`);
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

export async function deleteAlbum(id) {
    return del(`/data/albums/${id}`);
}

export async function editAlbum(id, album){
    return put(`/data/albums/${id}`, album)
}

export async function searchAlbum(query){
    // return get('/data/albums?where=name'+ encodeURIComponent(` LIKE "${query}"`));
    return get(`/data/albums?where=name%20LIKE%20%22${query}%22`);
}


// /data/albums?where=name%20LIKE%20%22${query}%22