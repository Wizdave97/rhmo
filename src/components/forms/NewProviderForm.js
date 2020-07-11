import React from 'react';
import ApiService from '../../utils/apiService';

class NewProviderForm extends React.Component {
  state = {
    name: '',
    address: '',
    state: '',
    rating: '',
    type: '',
    file: [],
    url: ''
  }
  componentDidMount() {
    const {provider} = this.props;
    if(provider) {
      this.setState({
        name: provider.name || '',
        rating: provider.rating || '',
        state: provider.state ? provider.state.name : '',
        address: provider.address || '',
        type: provider["provider_type"] ? provider["provider_type"].name : '',
        url: provider.images && provider.images[0] ? provider.images[0].url : ''
      })
    }
  }
  // TASK 5: Add New Provider
  // Add Functionality to the form below
  // On submission it should make a POST request to 
  // the server to create a new provider.
  // Refer to the API documentation for details.
  handleChange = (event) => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleFileSelect = (event) => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.files
    })
  }
  submitForm = (event) => {
    event.preventDefault();
    const { name, address, rating, type, state, file} = this.state;
    const data = {name, address, rating, provider_type: type, active_status:"Pending", description: "", state}
    if(this.props.provider) {
      if(name.trim() && address.trim() && rating.trim() && type.trim() && state.trim()){
        ApiService.put(ApiService.ENDPOINTS.providers + '/' + this.props.provider.id, data)
        .then(result => {
          if(file && file.length > 0){
            const formData = new FormData();
            formData.append("ref", "provider")
            formData.append("refId", this.props.provider.id);
            formData.append("field", "images");
            formData.append("files", file);
            ApiService.post(ApiService.ENDPOINTS.imageUpload + '/' + this.props.provider.id, formData)
            .then(result => { 
              alert("Provider Added successfully")
              console.log(result)
            }).catch(err => console.log(err))
          }
        }).catch(err => {
          alert("Provider was not added successfully")
          console.log(err)
        })
      }
    }
    else {
      ApiService.post(ApiService.ENDPOINTS.providers, data)
        .then(result => {
          if(file && file.length > 0){
            const formData = new FormData();
            formData.append("ref", "provider")
            formData.append("refId", result.id);
            formData.append("field", "images");
            formData.append("files", file);
            ApiService.post(ApiService.ENDPOINTS.imageUpload + '/' + this.props.provider.id, formData)
            .then(result => { 
              alert("Provider Added successfully")
              console.log(result)
            }).catch(err => {
              alert("Provider was not added successfully")
              console.log(err)
            })
          }
        }).catch(err => console.log(err));
    }
  }
  render() {
  
    return (
      <form className="form" onSubmit={this.submitForm} validate="true">
        <div className="form-group">
          <label htmlFor="name">Provider Name:</label>
          <input onChange={this.handleChange} value={this.state.name} className="input__style_1" type="text" name="name" />
        </div>
        <div className="form-group">
          <label htmlFor="address">Provider Address:</label>
          <input onChange={this.handleChange} value={this.state.address} className="input__style_1" type="text" name="address" />
        </div>
        <div className="form-group">
          <label htmlFor="address">Provider State:</label>
          <input onChange={this.handleChange} value={this.state.state} className="input__style_1" type="text" name="state" />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Provider Rating:</label>
          <select onChange={this.handleChange} value={this.state.rating} className="select input__style_1" type="number" name="rating">
            <option  value="1">1</option>
            <option  value="2">2</option>
            <option  value="3">3</option>
            <option  value="4">4</option>
            <option  value="5">5</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="type">Provider type:</label>
          <select onChange={this.handleChange} value={this.state.type} className="select input__style_1" type="text" name="type">
            <option value="hospital">Hospital</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="clinic">Clinic</option>
          </select>
        </div>        
        <div className="form-group">
          <label htmlFor="image">Provider Image</label>
          <img className="img-responsive" src={this.url} alt="new provider"/>
          <input value={this.state.file} onChange={this.handleFileSelect} type="file" name="file" />
        </div>
        <div className="form-group button-row">
          <button
            type="submit"
            className="btn btn-primary no-margin"
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default NewProviderForm;
