// src/services/api.ts
import axios from 'axios';

const API_KEY = ' 787495280bfb55468d8949adb36c8c8b'; // Replace with your actual API key
const BASE_URL = 'https://api.themoviedb.org/3';


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODc0OTUyODBiZmI1NTQ2OGQ4OTQ5YWRiMzZjOGM4YiIsInN1YiI6IjY2NjI2YzI3NzRhODY3NTllNGU5NWNjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h1bvg9IAprhLb4LytosdSlDHPB6qd3Id6Rp_ryPpAFI`,
  },
});


export const token = async () => {

    const response = await api.get('authentication/token/new');
    return response.data;
};

export const login = async (username: string, password: string, token: string) => {

  const response = await api.post('/authentication/token/validate_with_login', {
    username,
    password,
    request_token: token // Replace with your actual request token
  });

  return response.data;
};

export const trending = async (day: string) => {
  const response = await api.get(`trending/movie/${day}`);
  return response.data;
};

export const movie_detailes = async (id: number) => {
  const response = await api.get(`movie/${id}`);
  return response.data;
};

export const movie_reviews = async (id: number) => {
  const response = await api.get(`movie/${id}/reviews`);
  return response.data;
};

export const userProfile = async () => {
  const response = await api.get(`/account`);
  return response.data;
};

export const watchlist = async (account_id:number) => {
  const response = await api.get(`account/${account_id}/watchlist/movies`);
  return response.data;
};