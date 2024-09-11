import './Loader.scss';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Loader = () => {
  const chatApiLoading = useSelector((state) => state.chat.isLoading)
  const projectApiLoading = useSelector((state) => state.project.isLoading)
  const groupApiLoading=useSelector((state)=> state.group.isLoading)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (chatApiLoading || projectApiLoading || groupApiLoading) {
      setLoading(true);
    }
    else {
      const timer = setTimeout(() => {
        if (!chatApiLoading && !projectApiLoading && !groupApiLoading) {
          setLoading(false);
        }
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [chatApiLoading, projectApiLoading,groupApiLoading]);

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