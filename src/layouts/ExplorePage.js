import React from 'react';
import NavBar from '../components/common/NavBar';
import Gallery from '../components/ProviderGallery'
import NewProviderForm from '../components/forms/NewProviderForm';
import ApiService from '../utils/apiService';
import LoadingScreen from '../components/common/LoadingScreen';
import { pathGet } from '../utils/utils';

class ExplorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      textInput: ''
    };
  }

  componentDidMount() {
    this.setLoading(true);
    ApiService.get(ApiService.ENDPOINTS.providers)
      .then((data) => {
        console.log(data);
        this.setState({
          isLoading: false,
          data: data
        });
      }).catch(err => {
        console.log(err)
        this.setState({
          isLoading: false,
        })
      });
  }

  setLoading = (isLoading) => {
    this.setState({
      isLoading
    });
  }

  filterProviders = async (event) => {
    event.persist();
    // TASK 2:
    // On input, filter Available Providers based on Name, Address and Type
    //
    // ============== CODE GOES BELOW THIS LINE :) ==============
    this.setState({
      textInput: event.target.value
    })
    
    
  }

  switchView = () => {
    // TASK 4:
    // onClick on a view preference, switch across the different view options (Gallery, List, Grid)
    // based on whatever the user selects.
    //
    // ============== CODE GOES BELOW THIS LINE :) ==============
  }

  render() {
    const { isLoading, data, textInput } = this.state;
    const visibleProviders = textInput && data && data.length > 0 ? data.filter(provider => {
      const path = pathGet(provider, textInput.toLowerCase());
      return Boolean(path)
    }): data

    return (
      <div className="container">
        <NavBar />
        <div className="content__main">
          <section className="main__top-providers">
            <h2 className="text-header">Our Providers</h2>
            <div className="flex-row box-shadow" style={{padding:"1rem"}}>
              <div>
                <input
                  type="text"
                  value={this.state.textInput}
                  className="input__style_1 input__search"
                  placeholder="&#xf002; Search with Provider Name, Address, or Type"
                  onChange={this.filterProviders}
                  onInput={this.filterProviders}
                />
              </div>
              <div className="layout-switcher">
                  <i className="fa fa-images active" onClick={this.switchView}></i>
                  <i className="fa fa-th-large" onClick={this.switchView}></i>
                  <i className="fa fa-th-list" onClick={this.switchView}></i>
                </div>
            </div>
            {(isLoading || !visibleProviders) ? (
              <LoadingScreen />
            ) : (
              <React.Fragment>                
                <Gallery
                  items={visibleProviders.map((item) => ({id:item.id, imageUrl: item.images[0] ? item.images[0].url : '', name: item.name, description: item.description}))}
                />
              </React.Fragment>
            )}
          </section>
          <section className="main__new-provider fixed">
              <div className="new-provider">
                <h2 className="text-header">Can't find a Provider?</h2>
                <p className="text-body">Feel free to recommend a new one.</p>
                <hr/>
                <NewProviderForm provider={null}/>
              </div>
          </section>
        </div>
      </div>
    );
  }
}

export default ExplorePage;
