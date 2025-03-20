import { useState, useEffect, useContext } from 'react';
import PureHistory from '../utils/history';
import { PureRouterContext } from '.';

let historyInstance: PureHistory | null = null

const useHistory = () => {
  const { basename } = useContext(PureRouterContext)

  if (!historyInstance) {
    historyInstance = new PureHistory({ basename })
  }

  const [location, setLocation] = useState(historyInstance.location);

  useEffect(() => {
    const handlePopState = () => {
      setLocation((historyInstance!).location);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return {
    location,
    push: historyInstance.push,
    replace: historyInstance.replace,
    goBack: historyInstance.goBack,
  };
};

export default useHistory
