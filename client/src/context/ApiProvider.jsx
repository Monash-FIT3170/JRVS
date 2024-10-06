/**
 * @file ApiProvider Component
 *
 * @description Provides a context for interacting with a MongoDB API. This component includes functions
 * for making API requests such as GET, POST, PUT, and DELETE. It uses a context to make
 * these functions accessible throughout the application.
 *
 * @module ApiProvider
 * @requires react
 * @requires react/createContext
 * @requires react/useContext
 *
 * @returns {JSX.Element} The rendered ApiProvider component.
 */

import React, { createContext, useContext } from "react";

// Create a context for MongoDB API
const ApiContext = createContext();

// Custom hook to use MongoDB context
export const useApi = () => useContext(ApiContext);

// MongoDB API Provider component
export const ApiProvider = ({ children }) => {
  // Define your MongoDB API base URL
  const baseURL = `${process.env.REACT_APP_BACKEND_URL}`;

  // Generic function to make API requests
  const fetchData = async (url, options = {}) => {
    const token = localStorage.getItem("token"); // Get the token from local storage
    const defaultHeaders = {
      "Content-Type": "application/json",
    };

    const headers = {
      ...defaultHeaders,
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : undefined,
    };

    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  };

  // Function to get data from MongoDB
  const getData = async (endpoint) => {
    const url = `${baseURL}/${endpoint}`.replace(/([^:]\/)\/+/g, "$1");
    return fetchData(url);
  };

  // Function to post data to MongoDB
  const postData = async (endpoint, data) => {
    const url = `${baseURL}/${endpoint}`.replace(/([^:]\/)\/+/g, "$1");
    const options = {
      method: "POST",
      body: JSON.stringify(data),
    };
    return fetchData(url, options);
  };

  // Function to update data in MongoDB
  const updateData = async (endpoint, data) => {
    const url = `${baseURL}/${endpoint}`.replace(/([^:]\/)\/+/g, "$1");
    const options = {
      method: "PUT",
      body: JSON.stringify(data),
    };
    return fetchData(url, options);
  };

  // Function to delete data from MongoDB
  const deleteData = async (endpoint) => {
    const url = `${baseURL}/${endpoint}`.replace(/([^:]\/)\/+/g, "$1");
    const options = {
      method: "DELETE",
    };
    return fetchData(url, options);
  };

  return (
    <ApiContext.Provider
      value={{
        getData,
        postData,
        updateData,
        deleteData,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
