import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';
import CSSModules from 'react-css-modules';
import IS from './index.styl'
import banner1 from '../../assets/images/20170303110423423.jpg';
import banner2 from '../../assets/images/20170303110443443.jpg';
import banner3 from '../../assets/images/20170303110451451.jpg';
import titleImg from '../../assets/images/201703031135283528.png';

const bannerList = [banner1, banner2, banner3];
const bannerView = bannerList.map((o, i) => {
  return (
    <img styleName="banner" key={i} src={o} alt={i} />
  );
});

function Pagination(props) {
  const { index } = props;
  let arr = [0, 1, 2]
  console.log(props)
  return (
    <div styleName="pagination">
      {
        arr.map((o, i) =>
          <span styleName={o === index ? 'active' : ''} key={i} onClick={()=>{props.onChangeIndex(o)}}></span>
        )
      }
    </div>
  );
}

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
  }

  handleClick() {
    this.props.history.push('/others')
  }
  handleChangeIndex(index) {
    this.setState({index});
  };
  componentDidMount() {
  }
  render() {
    const Pagin = CSSModules(Pagination, IS)
    return (
      <div className="index-page" >
        <a href="/" styleName='title'><img src={titleImg} alt="深圳市四季青园林股份有限公司" /></a>
        <div styleName="swiper-container">
          <SwipeableViews enableMouseEvents styleName="banner-box" index={this.state.index} onChangeIndex={this.handleChangeIndex}>
            {bannerView}
          </SwipeableViews>
          <Pagin index={this.state.index} onChangeIndex={this.handleChangeIndex}/>
        </div>
        <Button variant="contained" color="primary" onClick={this.handleClick}>
          index-page
        </Button>
      </div>
    );
  }
}
export default CSSModules(Index, IS, { "allowMultiple": true });