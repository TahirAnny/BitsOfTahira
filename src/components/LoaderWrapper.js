import React, { useState } from 'react';
import Preloader from './Preloader';

const LoaderWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="App">
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      {!isLoading && children}
    </div>
  );
};

export default LoaderWrapper; 