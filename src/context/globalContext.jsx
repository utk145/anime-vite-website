// This file will contain the data that 

import React, { createContext, useContext, useEffect, useState } from "react";
import { useReducer } from "react";

const GlobalContext = createContext();

const baseUrl = `https://api.jikan.moe/v4`;


// actions
const LOADING = "LOADING";
const SEARCH = "SEARCH";
const POPULAR_ANIME = "POPULAR_ANIME";
const UPCOMING_ANIME = "UPCOMING_ANIME";
const AIRING_ANIME = "AIRING_ANIME";
const CHARACTER_IMAGES = "CHARACTER_IMAGES";


const reducer = (state, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true };
        case POPULAR_ANIME:
            return { ...state, popular: action.payload, loading: false };
        case SEARCH:
            return { ...state, searchResults: action.payload, loading: false };
        case UPCOMING_ANIME:
            return { ...state, upcoming: action.payload, loading: false };
        case AIRING_ANIME:
            return { ...state, airing: action.payload, loading: false };
        case CHARACTER_IMAGES:
            return { ...state, pictures: action.payload, loading: false };
        default:
            return state;
    }
    return state;
}

export const GlobalContextProvider = ({ children }) => {

    // Initial State                (I could've used useStates also )
    const initial = {
        popular: [],
        upcoming: [],
        airing: [],
        pictures: [],
        isSearch: false,
        searchResults: [],
        loading: false,
    }


    const [state, dispatch] = useReducer(reducer, initial);

    const getPopularAnime = async () => {
        dispatch({ type: LOADING })
        const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
        const data = await response.json();
        console.log(data.data);
        dispatch({ type: POPULAR_ANIME, payload: data.data });
    }


    const getUpcomingAnime = async () => {
        dispatch({ type: LOADING });
        // const response = await fetch(`${baseUrl}/top/anime?filter=upcoming`);
        const response = await fetch(`https://api.jikan.moe/v4/seasons/upcoming`);
        const data = await response.json();
        dispatch({ type: UPCOMING_ANIME, payload: data.data });
    }

    const getAiringAnime = async () => {
        dispatch({ type: LOADING })
        const response = await fetch(`${baseUrl}/top/anime?filter=airing`);
        const data = await response.json();
        dispatch({ type: AIRING_ANIME, payload: data.data })
    }

    useEffect(() => {
        getPopularAnime();
    }, [])

    const [search, setSearch] = useState('');

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        if (e.target.value === "") {
            state.isSearch = false;
        }
    }

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        if (search) {
            searchAnime(search);
            state.isSearch = true;
        } else {
            state.isSearch = false;
            alert("Please enter search term");
        }
    }

    const searchAnime = async (anime) => {
        dispatch({ type: LOADING })
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${anime}&order_by=popularity&sort=asc&sfw`);
        const data = await response.json();
        dispatch({ type: SEARCH, payload: data.data })
    }

    const characterImages = async (id) => {
        dispatch({ type: LOADING })
        const response = await fetch(`${baseUrl}/characters/${id}/pictures`);
        const data = await response.json();
        console.log(data);
        dispatch({ type: CHARACTER_IMAGES, payload: data.data })
    }

    return (
        <GlobalContext.Provider value={{
            ...state, handleSearchChange, handleSubmitSearch, searchAnime, search, getAiringAnime, getPopularAnime, getUpcomingAnime, characterImages
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
} 