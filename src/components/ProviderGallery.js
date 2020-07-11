import React from 'react';
import PropTypes from 'prop-types';
import LoadingScreen from './common/LoadingScreen';
import { withRouter } from 'react-router';

class Gallery extends React.Component {

  state ={
    previous: null,
    current: null,
    next: null,
  }
  componentDidMount() {
    const { items } = this.props; 
    if(items && items.length!==0) {
      this.setState({
        current:0,
        next: items.length >= 2 ? 1 : null
      })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { items } = this.props;
    if(prevProps.items.length === items.length) return
    if(items && prevProps.items.length !== items.length && items.length!==0) {
      this.setState({
        previous: null,
        current:0,
        next: items.length >= 2 ? 1 : null
      })
    }
  }
  // TASK 3a:
  // Complete the Gallery component to include functionality  
  // On click on left or right arrows, the gallery should change its image
  // On click of the thumbnails, the image selected should be updated as well
  // On click of the "Read more" button in the selected Image, it should redirect to the Selected Provider View.
  //
  //
  // Task 3b:
  // Write tests for the Gallery component. Tests should be written in the Gallery.spec.js file in the __tests__ folder.
  //
  //
  // ============== CODE GOES BELOW THIS LINE :) ==============
  handleLeftClick = () => {
    const { current } = this.state;
    if(current <= 0) return;
    this.setState({
      current: current - 1,
      next: current,
      previous: current - 2  >= 0 ? current - 2 : null
    })
  }
  handleRightClick = () => {
    const { current } = this.state;
    if(current >= (this.props.items.length - 1)) return;
    this.setState({
      current: current + 1,
      next: current + 2 < this.props.items.length ? current + 2 : null,
      previous: current
    })
  }
  handleThumbNailClick = (index) => {
    if (index === null) return;
    this.setState({
      current: index,
      previous: index - 1 >= 0 ? index - 1 : null,
      next: index + 1 <= this.props.items.length - 1 ? index + 1 : null
    })
  }
  viewProvider = (id) => {
    const { history } = this.props;
    history.push('/viewProvider:'+id)
  }
  render() {
    const { items } = this.props; 
    const { previous, current, next} = this.state;   
    if(!items || items.length === 0) {
      return (
        <LoadingScreen />
      )
    }
    
    return (
      
      <div data-testid="gallery" className="box-shadow gallery">
        <div className="gallery__slider">
          <div className="gallery__slider-item-wrapper">
            <div className="gallery__slider-item prev"
              style={{ backgroundImage:previous !== null && items[previous] ?  `url(${items[previous].imageUrl})` : `url("https://via.placeholder.com/150x100")`}}> 
            </div>
            <div className="gallery__slider-item active">
              <img src={current !== null ? items[current].imageUrl : "https://via.placeholder.com/150x100"} className="gallery__slider-item active" alt="" />
              <div className="gallery__slider-item__info" onClick={() => this.viewProvider(items[current].id)}>
                <div className="gallery__slider-item__info-name">{current  !== null? items[current].name : 'A provider name'}</div>
                <div className="gallery__slider-item__info-description" >
                  {current !== null ? items[current].description : 'A description'}
                  <p className="read-more" >Click to View</p>
                </div>
              </div>
            </div>          
            <div className="gallery__slider-item next"
              style={{backgroundImage:next !==  null && items[next] ? `url(${items[next].imageUrl})` : `url("https://via.placeholder.com/150x100")`}}>              
            </div>         
          </div>    
          <div className="gallery__slider-controls">
            <button onClick={this.handleLeftClick} className="gallery__slider-controls__button left">
              <i className="fa fa-chevron-left"></i>
            </button>
            <button onClick={this.handleRightClick} className="gallery__slider-controls__button right">
              <i className="fa fa-chevron-right"></i>
            </button>
          </div>      
        </div>     
        <div className="gallery__thumbnails">
          <div className="gallery__thumbnails__item"
            onClick={() => this.handleThumbNailClick(previous)}
            style={{backgroundImage:previous !== null && items[previous] ? `url(${items[previous].imageUrl})` : `url("https://via.placeholder.com/150x100")`}}>            
          </div>
          <div className="gallery__thumbnails__item active"
          onClick={() => this.handleThumbNailClick(current)}
            style={{backgroundImage:current !== null && items[current] ? `url(${items[current].imageUrl})` : `url("https://via.placeholder.com/150x100")`}}>            
          </div>
          <div className="gallery__thumbnails__item"
          onClick={() => this.handleThumbNailClick(next)}
            style={{backgroundImage:next !== null && items[next] ? `url(${items[next].imageUrl})` : `url("https://via.placeholder.com/150x100")`}}>            
          </div>                                      
        </div>
      </div>
    )
  }
}

Gallery.propTypes = {
  startFrom: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string,
    description: PropTypes.string
  })).isRequired,
  onClick: PropTypes.instanceOf(Function)
}

export default withRouter(Gallery)
