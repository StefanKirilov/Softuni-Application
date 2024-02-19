import {post, get, put, del} from './api.js';

export async function getAllAlbum() {
    return get('/data/albums?sortBy=_createdOn%20desc');
}

export async function createAlbum(album) {
    return post('/data/albums', album);
}

// export async function getMyBooks(userId) {
//     return get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
// }

export async function getAlbumsById(id) {
    return get(`/data/albums/${id}`);
}

export async function likeAlbum(albumId) {
    return post('/data/likes', {albumId});
}

export async function getTotalLikeAlbum(albumId) {
    return get(`/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`);
}

export async function getTotalLikeAlbumFromUser(albumId, userId) {
    return get(`/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

export async function deleteAlbum(id) {
    return del(`/data/albums/${id}`);
}

export async function editAlbum(id, album){
    return put(`/data/albums/${id}`, album)
}