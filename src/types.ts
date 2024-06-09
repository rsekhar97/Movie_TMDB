import { watchlist } from "./services/api";

// src/types.ts
export interface Movie {

    backdrop_path: string;
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: string;
    adult: string;
    original_language: string;
    popularity: number;
    release_date: string;
    vote_average: number;
    vote_count: number;
    
   
}



export interface Review {
    author: string;
    author_details: AuthorDetails;
    content: string;
    created_at: string;
    id: string;
    updated_at: string;
    url: string;
   
}

export interface AuthorDetails {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number;
}



interface Genre {
    id: number;
    name: string;
}

interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface Movie_Details {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: null | string;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}


export interface SessionData {
    expires_at: string;
    request_token: string;
    success: boolean;
}

export interface User_Profile {
    avatar: {
        gravatar: {
            hash: string;
        };
        tmdb: {
            avatar_path: string | null;
        };
    };
    id: number;
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    include_adult: boolean;
    username: string;
}


export interface watch_List{

    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}