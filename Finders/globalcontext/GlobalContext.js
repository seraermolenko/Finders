// GlobalContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPostings } from '../apis/apiCalls';


export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [isLoggingIn, setIsLoggingIn] = useState(true);
    const [needsFetchPostings, setNeedsFetchPostings] = useState(true);
    const [isFetchingPostings, setIsFetchingPostings] = useState(true);
    const [postings, setPostings] = useState([]);

    const login = async (token) => {
        console.log("Logging in with token:", token);
        setUserToken(token);
        await AsyncStorage.setItem('userToken', token);
    };

    const logout = async () => {
        setUserToken(null);
        await AsyncStorage.removeItem('userToken');
    };

    const checkLoginState = async () => {
        try {
            // Check if this is the first load of the session
            if (!sessionStorage.getItem('isFirstVisit')) {
                // Clear AsyncStorage on first load
                await AsyncStorage.removeItem('userToken');
                sessionStorage.setItem('isFirstVisit', 'true'); // Mark as visited
            }
            const token = await AsyncStorage.getItem('userToken');
            setUserToken(token);
        } catch (error) {
            console.error("Error accessing AsyncStorage:", error);
        } finally {
            setIsLoggingIn(false);
        }
    };

    // Function to fetch posts
    const fetchPostings = async () => {
        console.log("Fetching postings...");
        setIsFetchingPostings(true);
        try {
            const fetchedPostings = await getPostings();
            setPostings(fetchedPostings || []); // Fallback to empty array
        } catch (error) {
            console.error("Error fetching postings:", error);
            setPostings([]); // Reset on error
        } finally {
            setNeedsFetchPostings(false);
            setIsFetchingPostings(false);
        }
    };

    useEffect(() => {
        checkLoginState();
        if (needsFetchPostings) {
            fetchPostings();
        }
    }, [needsFetchPostings]);

    return (
        <GlobalContext.Provider value={{
            userToken,
            login,
            logout,
            isLoggingIn,
            isFetchingPostings,  // Separate loading state for fetching posts
            setNeedsFetchPostings,
            fetchPostings,
            postings
        }}>
            {children}
        </GlobalContext.Provider>
    );
};
