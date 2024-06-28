import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Loading = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { 

    axios.interceptors.request.use(request => {
      setIsLoading(true);
      return request;
    },
    error => {
      setIsLoading(false);
      return Promise.reject(error); 
    });

    

    axios.interceptors.response.use(
      response => {
        setIsLoading(false);
        return response;
      },
      error => {
        setIsLoading(false);
        return Promise.reject(error);
      });
    
    
  },
  (error) => {
    // Handle response errors
    setIsLoading(false);
    return Promise.reject(error);
  },);

  return (
    <>
      {isLoading && <div className="loading">Loading...</div>}
    </>
  );
};

//export default Loading;
