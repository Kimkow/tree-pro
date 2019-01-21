import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';
import CSSModules from 'react-css-modules';
import Hideen from '@material-ui/core/Hidden';
import { Link } from "react-router-dom";
import TreeMenu from '../../components/menu';
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
  return (
    <div styleName="pagination">
      {
        arr.map((o, i) =>
          <span styleName={o === index ? 'active' : ''} key={i} onClick={() => { props.onChangeIndex(o) }}></span>
        )
      }
    </div>
  );
}

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
  }

  handleClick() {
    this.props.history.push('/others')
  }
  handleChangeIndex(index) {
    this.setState({ index });
  };
  componentDidMount() {
    setInterval(()=>{
      let index = this.state.index+1;
      if(index === 3){
        index = 0;
      }
      this.setState({ index });
    },2000);
  }
  render() {
    const Pagin = CSSModules(Pagination, IS)
    return (
      <div className="index-page" >
        <Hideen smDown>
          <Link to="/others" styleName='title' replace><img src={titleImg} alt="深圳市四季青园林股份有限公司" /></Link>
        </Hideen>
        <Hideen mdUp>
        <TreeMenu />
          <Link to="/others" styleName='title mdUp' replace><img src={titleImg} alt="深圳市四季青园林股份有限公司" /></Link>
        </Hideen>
        <div styleName="swiper-container">
          <SwipeableViews enableMouseEvents styleName="banner-box" index={this.state.index} onChangeIndex={this.handleChangeIndex}>
            {bannerView}
          </SwipeableViews>
          <Hideen smDown><Pagin index={this.state.index} onChangeIndex={this.handleChangeIndex} /></Hideen>
        </div>
        <Button variant="contained" color="primary" onClick={this.handleClick}>
          index-page
        </Button>
      </div>
    );
  }
}
export default CSSModules(Index, IS, { "allowMultiple": true });