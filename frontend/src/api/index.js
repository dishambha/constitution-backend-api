import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getParts = async () => {
    try {
        const response = await api.get('/parts');
        return response.data;
    } catch (error) {
        console.error('Error fetching parts:', error);
        throw error;
    }
};

export const getPart = async (partId) => {
    try {
        // Handling the case where partId might need encoding if it contains special chars, though usually Part I, Part II etc.
        const response = await api.get(`/parts/${partId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching part ${partId}:`, error);
        throw error;
    }
};

export const getArticles = async () => {
    try {
        const response = await api.get('/articles');
        return response.data;
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;
    }
};

export const getArticle = async (articleId) => {
    try {
        const response = await api.get(`/articles/${encodeURIComponent(articleId)}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching article ${articleId}:`, error);
        throw error;
    }
};

export const getArticlesByPart = async (partId) => {
    try {
        const response = await api.get(`/articles/by-part/${partId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching articles for part ${partId}:`, error);
        throw error;
    }
};

export const getSchedules = async () => {
    try {
        const response = await api.get('/schedules');
        return response.data;
    } catch (error) {
        console.error('Error fetching schedules:', error);
        throw error;
    }
};

export const getSchedule = async (scheduleId) => {
    try {
        const response = await api.get(`/schedules/${scheduleId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching schedule ${scheduleId}:`, error);
        throw error;
    }
};

export const getPreamble = async () => {
    try {
        const response = await api.get('/preamble');
        return response.data;
    } catch (error) {
        console.error('Error fetching preamble:', error);
        throw error;
    }
};
