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

function Body() {
  return (
    <div styleName='body'>
      <Hideen mdUp>
        <div styleName="pd-10">
          <h1 styleName="body-h1">公司<span>简介</span></h1>
          <h3 styleName="body-h3">深圳市四季青园林股份有限公司</h3>
          <p styleName="body-p">深圳市四季青园林股份有限公司（原深圳市四季青园林花卉有限公司）始创于1986年，是一家集苗木生产与销售、园林景观规划设计和建设施工于一体的专业园林景观公司。公司具有国家建设部颁发的城市园林绿化一级企业资质、风景园林设计专项乙级资格证书</p>
          <p styleName="body-p"> 自成立之初，四季青就一直秉持着“规划设计为魂•施工建设为体•苗木产销为器”的系统化运营理念，始终坚持并努力践行“环境提升价值•绿色写意生活•细节雕琢完美”的品牌思想，先后与多家国际知名景观设计公司：CICADA、ACOM、BCA、EDSA、和ACLA等，以及与多家国内知名品牌地产开发商：万科、万达、佳兆业、恒大、华侨城等建立了长期稳定的合作关系，以品质和服务赢得了市场。</p>
          <p style={{ textAlign: 'center' }}>
            <Button variant="contained" color="primary" href="#about" styleName="body-button">查看更多</Button>
          </p>
          <img src={require('../../assets/images/201703031544534453.jpg')} alt="" styleName="body-img" />
        </div>
        <div styleName="white-body">
          <h1 styleName="body-h1">工程<span>系列</span></h1>
        </div>
      </Hideen>
    </div>
  )
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
  }
  render() {
    const PaginationIS = CSSModules(Pagination, IS)
    const menuName = this.props.location.pathname
    const BodyIS = CSSModules(Body, IS)
    return (
      <div className="index-page" >
        <Hideen smDown>
          <Link to="/others" styleName='title' replace><img src={titleImg} alt="深圳市四季青园林股份有限公司" /></Link>
        </Hideen>
        <TreeMenu menuName={menuName} />
        <Hideen mdUp>
          <Link to="/others" styleName='title mdUp' replace><img src={titleImg} alt="深圳市四季青园林股份有限公司" /></Link>
        </Hideen>
        <div styleName="swiper-container">
          <SwipeableViews enableMouseEvents styleName="banner-box" index={this.state.index} onChangeIndex={this.handleChangeIndex}>
            {bannerView}
          </SwipeableViews>
          <Hideen smDown><PaginationIS index={this.state.index} onChangeIndex={this.handleChangeIndex} /></Hideen>
        </div>
        <BodyIS />
        <Button variant="contained" color="primary" onClick={this.handleClick}>
          index-page
        </Button>
      </div>
    );
  }
}
export default CSSModules(Index, IS, { "allowMultiple": true });