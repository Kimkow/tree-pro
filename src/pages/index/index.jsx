import React, { Component, useState } from 'react';
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';
import CSSModules from 'react-css-modules';
import Hideen from '@material-ui/core/Hidden';
import { Link } from "react-router-dom";
import TreeMenu from '../../components/menu';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import indexData from './indexData';
import IS from './index.styl'
import banner1 from '../../assets/images/20170303110423423.jpg';
import banner2 from '../../assets/images/20170303110443443.jpg';
import banner3 from '../../assets/images/20170303110451451.jpg';
import titleImg from '../../assets/images/201703031135283528.png';
const bannerList = [banner1, banner2, banner3];
const menuName = 'index'
// 轮播图
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
const miaomuItems = [
  { name: '苗木事业部', image: '0', link: '/' },
  { name: '海南东方苗场', image: '1', link: '/' },
  { name: '四季百和中山苗场', image: '2', link: '/' },
  { name: '安徽肥东苗场', image: '3', link: '/' },
  { name: '安徽六安苗场', image: '4', link: '/' },
  { name: '湖北梅川苗场', image: 'nopic', link: '/' },
  { name: '江西舜德苗场', image: 'nopic', link: '/' },
  { name: '苗木系列', image: '7', link: '/' }
];
const miaomuItemPc = [];
for (let i = 0; i < 3; i++) {
  let children = [];
  if (miaomuItems[i]) {
    children.push(miaomuItems[i])
  }
  if (miaomuItems[i + 1]) {
    children.push(miaomuItems[i + 1])
  }
  if (miaomuItems[i + 2]) {
    children.push(miaomuItems[i + 2])
  }
  miaomuItemPc.push(children);
}
// 中间主体
function Body() {
  const [index, setIndex] = useState(0);
  const data = indexData.projectData;
  const [pcIndex, setPcIndex] = useState(0);
  const [moblieIndex, setMoblieIndex] = useState(0);
  function handleChangeIndex(index) {
    setIndex(index);
  }

  function handleChangeMiaoMuIndex(index, type) {
    let fns = [setPcIndex, setMoblieIndex]
    fns[type](index)
  }
  return (
    <div styleName='body'>
      <Hideen smDown>
        <div styleName="pd-10 about">
          <div styleName="about-left">
            <div styleName="line"></div>
            <img src={require('../../assets/images/icont_tip1.jpg')} alt="" />
            <h1 styleName="body-h1">公司<span>简介</span></h1>
          </div>
          <div styleName="about-right">
            <h3 styleName="body-h3">深圳市四季青园林股份有限公司</h3>
            {indexData.aboutData.map((o, i) => {
              return (
                <p styleName="body-p" key={i}>{o}</p>
              )
            })}
            <p style={{ position: 'relative' }}>
              <Button variant="contained" color="primary" href="#/others/about/1" styleName="body-button">查看更多</Button>
              <span styleName="moreline"></span>
            </p>
            <img src={require('../../assets/images/201703031544534453.jpg')} alt="" styleName="body-img" />
          </div>
        </div>
        <div styleName="white-body project">
          <img src={require('../../assets/images/201703031549554955.jpg')} alt="" styleName="project-left" />
          <div styleName="project-right">
            <img src={require('../../assets/images/icont_tip2.jpg')} alt="" />
            <h1 styleName="body-h1">工程<span>系列</span></h1>
            <div styleName="line" style={{ marginLeft: '20px' }}></div>
          </div>
          <div styleName="project-middle">
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
                let projectUrl = '/others/project/4'
                let subTitle = '';
                if (item.subName) {
                  subTitle = (<span styleName="sub-title"><br />{item.subName}</span>);
                }
                return (
                  <div key={index} styleName="project-group">
                    <img src={require('../../assets/images/project/4' + item.link + '.jpg')} alt={item.name} />
                    <a href={'#' + projectUrl + item.link} styleName="project-middle-title">{item.name}</a>
                    {subTitle}
                    <p dangerouslySetInnerHTML={{ __html: item.text }} />
                    <p><Button variant="contained" color="primary" href={'#' + projectUrl + item.link} styleName="body-button">查看更多</Button></p>
                  </div>
                )
              })}
            </SwipeableViews>
          </div>
        </div>
        <div styleName="pd-10 about">
          <div styleName="about-left">
            <div styleName="line"></div>
            <img src={require('../../assets/images/icont_tip3.jpg')} alt="" />
            <h1 styleName="body-h1">苗木<span>系列</span></h1>
          </div>
          <div styleName="about-right">
            <SwipeableViews enableMouseEvents styleName="banner-box" index={moblieIndex} onChangeIndex={(e) => { handleChangeMiaoMuIndex(e, 0) }}>
              {
                miaomuItemPc.map((o, i) => {
                  let children = o.map((item, keys) => {
                    return (
                      <ButtonBase focusRipple key={keys} styleName="miaomu-group">
                        <span styleName="miaomu-pic" style={{ backgroundImage: `url(${require('../../assets/images/miaomu/' + item.image + '.jpg')})` }} />
                        <div styleName="miaomu-mask">
                          <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                          >
                            <span styleName="miaomu-title">{item.name}</span>
                            <a href={`#${item.link}`}><AddIcon styleName="miaomu-add" /></a>
                          </Typography>
                        </div>
                      </ButtonBase>
                    )
                  })
                  return (
                    <div key={i} style={{ maxWidth: '1014px', margin: '0 auto' }}>{children}</div>
                  )
                })
              }
            </SwipeableViews>
            <div styleName="miaomu-pagination">
              {
                miaomuItemPc.map((o, i) => {
                  return (
                    <span key={i} styleName={i === moblieIndex ? 'active' : ''} onClick={() => { handleChangeMiaoMuIndex(i, 0) }}></span>
                  )
                })
              }
            </div>
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
            <Button variant="contained" color="primary" href="#/others/about/1" styleName="body-button">查看更多</Button>
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
              let subTitle = '';
              if (item.subName) {
                subTitle = (<span styleName="sub-title">{item.subName}<br /></span>);
              }
              return (
                <div key={index} styleName="project-group">
                  <img src={require('../../assets/images/project/4' + item.link + '.jpg')} alt={item.name} />
                  <p>{item.name}<br />{subTitle}<Button variant="contained" color="primary" href={'#' + projectUrl + item.link} styleName="body-button">查看更多</Button></p>
                </div>
              )
            })}
          </SwipeableViews>
        </div>
        <div styleName="pd-10">
          <h1 styleName="body-h1">苗木<span>系列</span></h1>
          <SwipeableViews enableMouseEvents styleName="banner-box" index={pcIndex} onChangeIndex={(e) => { handleChangeMiaoMuIndex(e, 0) }}>
            {
              miaomuItems.map((o, i) => {
                return (
                  <ButtonBase focusRipple key={i} styleName="miaomu-group mobile">
                    <span styleName="miaomu-pic" style={{ backgroundImage: `url(${require('../../assets/images/miaomu/' + o.image + '.jpg')})` }} />
                    <div styleName="miaomu-mask">
                      <Typography
                        component="span"
                        variant="subtitle1"
                        color="inherit"
                      >
                        <span styleName="miaomu-title">{o.name}</span>
                        <a href={`#${o.link}`}><AddIcon styleName="miaomu-add" /></a>
                      </Typography>
                    </div>
                  </ButtonBase>
                )
              })
            }
          </SwipeableViews>
          <div styleName="miaomu-pagination">
            {
              miaomuItems.map((o, i) => {
                return (
                  <span key={i} styleName={i === pcIndex ? 'active' : ''} onClick={() => { handleChangeMiaoMuIndex(i, 0) }}></span>
                )
              })
            }
          </div>
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
  }
  componentDidMount() {
  }
  render() {
    const BannerSwiperIS = CSSModules(BannerSwiper, IS)
    const BodyIS = CSSModules(Body, IS, { "allowMultiple": true })
    return (
      <div className="index-page" >
        <Hideen smDown>
          <Link to="/others" styleName='title'><img src={titleImg} alt="深圳市四季青园林股份有限公司" /></Link>
        </Hideen>
        <TreeMenu menuName={menuName} />
        <Hideen mdUp>
          <Link to="/others" styleName='title mdUp'><img src={titleImg} alt="深圳市四季青园林股份有限公司" /></Link>
        </Hideen>
        <BannerSwiperIS />
        <BodyIS />
      </div>
    );
  }
}
export default CSSModules(Index, IS, { "allowMultiple": true });