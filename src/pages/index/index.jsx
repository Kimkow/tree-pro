import React, { Component, useState } from 'react';
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';
import CSSModules from 'react-css-modules';
import Hideen from '@material-ui/core/Hidden';
import { Link } from "react-router-dom";
import TreeMenu from '../../components/menu';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';
import indexData from './indexData';
import IS from './index.styl'
import banner1 from '../../assets/images/20170303110423423.jpg';
import banner2 from '../../assets/images/20170303110443443.jpg';
import banner3 from '../../assets/images/20170303110451451.jpg';
import titleImg from '../../assets/images/201703031135283528.png';

const bannerList = [banner1, banner2, banner3];

function BannerSwiper() {
  const [index, setIndex] = useState(0);

  function handleChangeIndex(index) {
    setIndex(index);
  }
  const bannerView = bannerList.map((o, i) => {
    return (
      <img styleName="banner" key={i} src={o} alt={i} />
    );
  });
  return (
    <div styleName="swiper-container">
      <SwipeableViews enableMouseEvents styleName="banner-box" index={index} onChangeIndex={handleChangeIndex}>
        {bannerView}
      </SwipeableViews>
      <Hideen smDown>
        <div styleName="pagination">
          {
            bannerList.map((o, i) =>
              <span styleName={i === index ? 'active' : ''} key={i} onClick={() => { handleChangeIndex(i) }}></span>
            )
          }
        </div>
      </Hideen>
    </div>
  );
}

function Body() {
  const [index, setIndex] = useState(0);
  const data = indexData.projectData;

  function handleChangeIndex(index) {
    setIndex(index);
  }
  return (
    <div styleName='body'>
      <Hideen smDown>
        <div styleName="pd-10 about">
          <div styleName="about-left">
            <img src={require('../../assets/images/icont_tip1.jpg')} alt=""/>
            <h1 styleName="body-h1">公司<span>简介</span></h1>
          </div>
          <div styleName="about-right">
            <h3 styleName="body-h3">深圳市四季青园林股份有限公司</h3>
            {indexData.aboutData.map((o, i) => {
              return (
                <p styleName="body-p" key={i}>{o}</p>
              )
            })}
            <p style={{position:'relative'}}>
              <Button variant="contained" color="primary" href="#/about" styleName="body-button">查看更多</Button>
              <span styleName="moreline"></span>
            </p>
            <img src={require('../../assets/images/201703031544534453.jpg')} alt="" styleName="body-img" />
          </div>
        </div>
      </Hideen>
      <Hideen mdUp>
        <div styleName="pd-10">
          <h1 styleName="body-h1">公司<span>简介</span></h1>
          <h3 styleName="body-h3">深圳市四季青园林股份有限公司</h3>
          {indexData.aboutData.map((o, i) => {
            return (
              <p styleName="body-p" key={i}>{o}</p>
            )
          })}
          <p style={{ textAlign: 'center' }}>
            <Button variant="contained" color="primary" href="#/about" styleName="body-button">查看更多</Button>
          </p>
          <img src={require('../../assets/images/201703031544534453.jpg')} alt="" styleName="body-img" />
        </div>
        <div styleName="white-body">
          <h1 styleName="body-h1">工程<span>系列</span></h1>
          <p style={{ textAlign: 'center' }}>
            <Button onClick={() => { handleChangeIndex(index - 1) }} variant="contained" disabled={index === 0} color="primary" styleName="body-button" style={{ marginRight: '10px' }}>
              <LeftIcon />
            </Button>
            <Button onClick={() => { handleChangeIndex(index + 1) }} variant="contained" disabled={index === (data.length - 1)} color="primary" styleName="body-button">
              <RightIcon />
            </Button>
          </p>
          <SwipeableViews styleName="banner-box" index={index} onChangeIndex={handleChangeIndex}>
            {data.map((item, index) => {
              let projectUrl = '/others/object'
              return (
                <div key={index} styleName="project-group">
                  <img src={require('../../assets/images/project' + item.link + '.jpg')} alt={item.name} />
                  <p>{item.name}<br /><Button variant="contained" color="primary" href={'#' + projectUrl + item.link} styleName="body-button">查看更多</Button></p>
                </div>
              )
            })}
          </SwipeableViews>
        </div>
      </Hideen>
    </div>
  )
}

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.history.push('/others');
  }
  componentDidMount() {
  }
  render() {
    const BannerSwiperIS = CSSModules(BannerSwiper, IS)
    const menuName = this.props.location.pathname
    const BodyIS = CSSModules(Body, IS,{ "allowMultiple": true })
    return (
      <div className="index-page" >
        <Hideen smDown>
          <Link to="/others" styleName='title' replace><img src={titleImg} alt="深圳市四季青园林股份有限公司" /></Link>
        </Hideen>
        <TreeMenu menuName={menuName} />
        <Hideen mdUp>
          <Link to="/others" styleName='title mdUp' replace><img src={titleImg} alt="深圳市四季青园林股份有限公司" /></Link>
        </Hideen>
        <BannerSwiperIS />
        <BodyIS />
        <Button variant="contained" color="primary" onClick={this.handleClick}>
          index-page
        </Button>
      </div>
    );
  }
}
export default CSSModules(Index, IS, { "allowMultiple": true });