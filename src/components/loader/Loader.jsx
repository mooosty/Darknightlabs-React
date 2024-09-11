import './Loader.scss';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Loader = () => {
  const chatApiLoading = useSelector((state) => state.chat.isLoading)
  const projectApiLoading = useSelector((state) => state.project.isLoading)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (chatApiLoading || projectApiLoading) {
      setLoading(true);
    }
    else {
      const timer = setTimeout(() => {
        if (!chatApiLoading && !projectApiLoading) {
          setLoading(false);
        }
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [chatApiLoading, projectApiLoading]);

  return (
    <>
      {(loading) && <div className="loader_container">
        <div className="loader">
        </div>
      </div>}
    </>
  )
}

export default Loader