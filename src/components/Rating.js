import React, { Component } from 'react';
// import hamburger from '../assets/hamburger.svg';
// import { Link } from 'react-router';
// import { observer } from 'mobx-react';
// import appState from '../appState';


const Star = ({isOn, onClick}) => {
  return (
    <i
      onClick={onClick}
      style={{
        width:50, height:50,
        textAlign:'center', lineHeight:'50px',
        color: 'rgba(252,185,76,1)',
        fontSize: '30px'
      }}
      className={`glyphicon glyphicon-star${isOn?'':'-empty'}`}>
    </i>
  )
}

class Rating extends Component {
  handleClick(val){
    //console.log('STAR', val)
    this.props.onChange(val);
  }

  render() {
    let {stars} = this.props;
    return (
      <div style={{ height: 50}}>
        <Star onClick={this.handleClick.bind(this,1)} isOn={stars>0} />
        <Star onClick={this.handleClick.bind(this,2)} isOn={stars>1} />
        <Star onClick={this.handleClick.bind(this,3)} isOn={stars>2} />
        <Star onClick={this.handleClick.bind(this,4)} isOn={stars>3} />
        <Star onClick={this.handleClick.bind(this,5)} isOn={stars>4} />
      </div>
    )
  }
};

export default Rating;
