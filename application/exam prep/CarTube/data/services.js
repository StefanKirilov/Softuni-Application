import {post, get, put, del} from './api.js';

export async function getAllCars() {
    return get('/data/cars?sortBy=_createdOn%20desc');
}

export async function createCar(car) {
    return post('/data/cars', car);
}

export async function getMyCars(userId) {
    return get(`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function getCarById(id) {
    return get(`/data/cars/${id}`);
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

export async function deleteCar(id) {
    return del(`/data/cars/${id}`);
}

export async function editCar(id, car){
    return put(`/data/cars/${id}`, car)
}

export async function searchCar(query){
    // return get('/data/albums?where=name'+ encodeURIComponent(` LIKE "${query}"`));
    return get(`/data/cars?where=year%3D${query}`);
}


// // /data/albums?where=name%20LIKE%20%22${query}%22