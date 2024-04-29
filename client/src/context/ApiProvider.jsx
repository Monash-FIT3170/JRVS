import React, { createContext, useContext, useState } from 'react';

// Create a context for MongoDB API
const ApiContext = createContext();

// Custom hook to use MongoDB context
export const useApi = () => useContext(ApiContext);

// MongoDB API Provider component
export const ApiProvider = ({ children }) => {
  // Define your MongoDB API base URL
  const baseURL = 'http://localhost:5000';

  // Generic function to make API requests
  const fetchData = async (url, options = {}) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  // Function to get data from MongoDB
  const getData = async (endpoint) => {
    const url = `${baseURL}/${endpoint}`;
    return fetchData(url);
  };

  // Function to post data to MongoDB
  const postData = async (endpoint, data) => {
    const url = `${baseURL}/${endpoint}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return fetchData(url, options);
  };

  // Function to update data in MongoDB
  const updateData = async (endpoint, data) => {
    const url = `${baseURL}/${endpoint}`;
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return fetchData(url, options);
  };

  // Function to delete data from MongoDB
  const deleteData = async (endpoint) => {
    const url = `${baseURL}/${endpoint}`;
    const options = {
      method: 'DELETE',
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