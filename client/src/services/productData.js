import axios from 'axios';
const baseUrl = 'http://localhost:5000';

export async function getAll(page, category, query) {
    if (query !== "" && query !== undefined) {
        return (await fetch(`${baseUrl}/products?page=${page}&search=${query}`, { credentials: 'include' })).json();
    } else if (category && category !== 'all') {
        return (await fetch(`${baseUrl}/products/${category}?page=${page}`, { credentials: 'include' })).json();
    } else {
        return (await fetch(`${baseUrl}/products?page=${page}`, { credentials: 'include' })).json();
    }
}
export async function getInitProductById(id) {
    return (await fetch(`${baseUrl}/api/products/init/${id}`, { credentials: 'include' })).json();
}
export async function getReviews(id) {
    return (await fetch(`${baseUrl}/api/public/reviews/${id}`, { credentials: 'include' })).json();
}
export async function getProductFullInfo(id) {
    return (await fetch(`${baseUrl}/api/products/${id}`, { credentials: 'include' })).json();
}
export async function createProduct(product) {
    return (await fetch(`${baseUrl}/products/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(product)
    })).json();
}

export async function editProduct(id, product) {
    return (await fetch(`${baseUrl}/products/edit/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(product)
    })).json();
}


export async function activateSell(id) {
    return (await fetch(`/products/enable/${id}`)).json()
}

export async function archiveSell(id) {
    return (await fetch(`/products/archive/${id}`)).json()
}

export async function wishProduct(id) {
    return (await fetch(`${baseUrl}/products/wish/${id}`, { credentials: 'include' })).json();
}



