import {post, get, put, del} from './api.js';

export async function getAllProducts() {
    return get('/data/shoes?sortBy=_createdOn%20desc');
}

export async function createProduct(product) {
    return post('/data/shoes', product);
}

// export async function getMyCars(userId) {
//     return get(`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
// }

export async function getProductById(id) {
    return get(`/data/shoes/${id}`);
}

// // // export async function donatePet(petId) {
// // //     return post('/data/donation', {petId});
// // // }

// // // export async function getTotalDonatePet(petId) {
// // //     return get(`/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);
// // // }

// // // export async function getTotalDonatePetFromUser(petId, userId) {
// // //     return get(`/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
// // // }

export async function deleteProduct(id) {
    return del(`/data/shoes/${id}`);
}

export async function editProduct(id, product){
    return put(`/data/shoes/${id}`, product)
}

export async function searchProduct(query){
    // return get('/data/albums?where=name'+ encodeURIComponent(` LIKE "${query}"`));
    return get(`/data/shoes?where=brand%20LIKE%20%22${query}%22`);
}


// // /data/albums?where=name%20LIKE%20%22${query}%22