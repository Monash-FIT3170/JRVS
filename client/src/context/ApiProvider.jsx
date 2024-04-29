import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for MongoDB API
const ApiContext = createContext();

// Custom hook to use MongoDB context
export const useMongoDB = () => useContext(MongoDBContext);

// MongoDB API Provider component
export const MongoDBProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Define your MongoDB API base URL
  const baseURL = 'http://localhost:5000';

  // Generic function to make API requests
  const fetchData = async (url, options = {}) => {
    setLoading(true);
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error.message);
      throw error;
    }
  };

  // Function to fetch data from MongoDB
  const fetchDataFromMongoDB = async (endpoint) => {
    const url = `${baseURL}/${endpoint}`;
    return fetchData(url);
  };

  // Function to post data to MongoDB
  const postDataToMongoDB = async (endpoint, data) => {
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
  const updateDataInMongoDB = async (endpoint, data) => {
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
  const deleteDataFromMongoDB = async (endpoint) => {
    const url = `${baseURL}/${endpoint}`;
    const options = {
      method: 'DELETE',
    };
    return fetchData(url, options);
  };

  return (
    <ApiContext.Provider
      value={{
        loading,
        error,
        fetchDataFromMongoDB,
        postDataToMongoDB,
        updateDataInMongoDB,
        deleteDataFromMongoDB,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};