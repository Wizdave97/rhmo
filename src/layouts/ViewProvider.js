import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingScreen from '../components/common/LoadingScreen';
import NewProviderForm from '../components/forms/NewProviderForm';
import ApiService from '../utils/apiService';

const ViewProvider = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [provider, setProvider] = useState(null)
  const { id } = useParams();
  useEffect(() => {
    fetchProvider();
  }, [])
  const fetchProvider = () => {
    setIsLoading(true)
    ApiService.get(ApiService.ENDPOINTS.providers+'/'+id.replace(':', ''))
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        if(data.statusCode == 200) setProvider(data)
      }).catch(err => {
        console.log(err);
        setIsLoading(false)
      });
  }
  // TASK 6:
  // Render Single Provider View Here
  // Feel free to using existing styles,
  // or add new ones if you want to :)
  //
  // For Bonus points, you can also add functionality to edit the provider
  // Reusing the NewProviderForm component for this will make it a whole lot easier :D
  let display = <LoadingScreen />;
  if (!isLoading && provider) display = (
    <section className="view-provider">
      <div className="new-provider">
        <h1>View or Edit Provider <span><i className="fa fa-edit"></i></span></h1>
        <NewProviderForm />
      </div>
    </section>
  )
  if (!isLoading && !provider) display = <h3>An error occurred <span onClick={() => fetchProvider()}><i className="fa fa-retry"></i>Click here to retry</span></h3>
  return (
    <div>
      {display}
    </div>
  )
};

export default ViewProvider;