import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const usePreviousRoute = () => {
  const location = useLocation();
  const previousLocationRef = useRef(null);

  useEffect(() => {
    previousLocationRef.current = location;
  }, [location]);

  return previousLocationRef.current;
};

export default usePreviousRoute;
