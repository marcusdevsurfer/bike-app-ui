import { API_URL } from '@env';

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