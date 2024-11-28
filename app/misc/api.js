import { API_URL } from '@env';

export const fetchUser = async (id) => {
    try {
        const response = await fetch(`${API_URL}/users/${id}`);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error + "Error en fetchUser");
    }
};

export const fetchRental = async (id) => {
    try {
        const response = await fetch(`${API_URL}/rentals/${id}`);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
};

export const fetchBike = async (id) => {
    try {
        const response = await fetch(`${API_URL}/bikes/${id}`);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const fetchStation = async (id) => {
    try {
        const response = await fetch(`${API_URL}/stations/${id}`);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }

};

export const fetchAndSetStations = async (setData) => {
    try {
        const response = await fetch(`${API_URL}/stations`)
        const data = await response.json();
        setData(data);
    }
    catch (error) {
        console.error(error);
    }
}

export const fetchAndSetUsers = async (setData) => {
    try {
        const response = await fetch(`${API_URL}/users`)
        const data = await response.json();
        setData(data);
    }
    catch (error) {
        console.error(error);
    }
}

export const fetchAndSetBikes = async (setData) => {
    try {
        const response = await fetch(`${API_URL}/bikes`)
        const data = await response.json();
        setData(data);
    }
    catch (error) {
        console.error(error);
    }
}