import { useState, useEffect } from 'react';
import history from '../utils/history';

const useHistory = () => {
  const [location, setLocation] = useState(history.location);

  useEffect(() => {
    const handlePopState = () => {
      setLocation(history.location);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return {
    location,
    push: history.push,
    replace: history.replace,
    goBack: history.goBack,
  };
};

export default useHistory
