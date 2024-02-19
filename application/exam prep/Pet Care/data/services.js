import {post, get, put, del} from './api.js';

export async function getAllPets() {
    return get('/data/pets?sortBy=_createdOn%20desc&distinct=name');
}

export async function createPet(pet) {
    return post('/data/pets', pet);
}

// export async function getMyBooks(userId) {
//     return get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
// }

export async function getPetsById(id) {
    return get(`/data/pets/${id}`);
}

export async function donatePet(petId) {
    return post('/data/donation', {petId});
}

export async function getTotalDonatePet(petId) {
    return get(`/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);
}

export async function getTotalDonatePetFromUser(petId, userId) {
    return get(`/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

export async function deletePet(id) {
    return del(`/data/pets/${id}`);
}

export async function editPet(id, pet){
    return put(`/data/pets/${id}`, pet)
}