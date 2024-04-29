import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ApiContext = createContext({});

export const useApi = () => {
  return useContext(ApiContext);
};

const api = axios.create({
  baseURL: 'http://localhost:5000', // Set your backend base URL here
});

export const ApiProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State for loading status

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/badges');
        setData(response.data);
        setIsLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get('/api/badges');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addData = async (newData) => {
    try {
      await api.post('/api/badges', newData);
      fetchData();
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(`/api/badges/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <ApiContext.Provider value={{ data, addData, deleteData, isLoading }}>
      {children}
    </ApiContext.Provider>
  );
};
