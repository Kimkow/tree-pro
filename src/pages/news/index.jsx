import React, { Component, useState } from 'react';
import Button from '@material-ui/core/Button';
import CSSModules from 'react-css-modules';
import MinMenu from '../../components/minMenu';
import Hideen from '@material-ui/core/Hidden';
import PS from './news.styl';
import contentText from './text';
import Pagination from '../../components/pagination';
import Detail from '../../components/detailOther';

const minMenuData = [
  { name: '公司新闻', value: 1 },
  { name: '行业新闻', value: 2 },
  { name: '公司活动', value: 3 },
  { name: '政策法规', value: 4 }
];

function DefaultContent() {
  return (<div styleName="text-container">暂无数据</div>)
}
function NormalContent(props) {
  const { activeIndex } = props;
  const contentObj = contentText.minList[activeIndex];
  const [activeList, setActiveList] = useState(contentObj[0]);
  function handleChangePage(page) {
    setActiveList(contentObj[parseInt(page - 1)])
  }
  return (
    <div styleName="text-container">
      <div styleName="line"/>
      {
        activeList.map((o, i) => {
          return (
            <div styleName="list-group" key={i}>
              <img styleName="img" src={require("../../assets/images/news/" + o.url)} alt="" />
              <div styleName="content">
                <h1>{o.title}</h1>
                <p styleName="date">发布时间：<span>{ o.time }</span></p>
                <p>{o.text}</p>
                <Button variant="contained" component='a' href={`#/others/news/${activeIndex}/${o.value}`} color="primary" styleName="body-button">查看详情</Button>
              </div>
            </div>
          )
        })
      }
      <Pagination total={7} pageSize={3} currentChange={handleChangePage} />
    </div>
  )
}

function ContentText(props) {
  let { activeIndex } = props;
  let valueCount = parseInt(activeIndex);
  const DefaultPS = CSSModules(DefaultContent, PS, { "allowMultiple": true });
  const NormalContentPS = CSSModules(NormalContent, PS, { "allowMultiple": true });
  if (valueCount === 1 || valueCount === 4) {
    return <NormalContentPS activeIndex={activeIndex} />;
  } else {
    return <DefaultPS />
  }
}

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    let path = this.props.match.path.split(':')[0];
    let activeIndex = this.props.match.params.id; // 当前子菜单ID
    let childId = this.props.location.pathname.replace(new RegExp(this.props.match.url, 'g'), '');
    childId = childId.replace(/\//g,'');//详情ID
    const publicSrc = `news/${activeIndex}/detail/${childId}/`;

    let detailObj = {};
    if(childId) {
      detailObj = contentText.detailList[activeIndex][childId];//详情内容
    }

    return (
      <div styleName="container">
        <Hideen smDown>
          <div styleName="menu">
            <div styleName="img-group">
              <img src={require('../../assets/images/news/menu.png')} alt="" />
              <img src={require('../../assets/images/icont_tip_bg2.png')} alt="" />
            </div>
            <MinMenu listData={minMenuData} menuPath={path} activeIndex={activeIndex} />
          </div>
        </Hideen>
        <Hideen mdUp>
          <MinMenu listData={minMenuData} menuPath={path} activeIndex={activeIndex} />
        </Hideen>
        {
          childId ? <Detail detailObj={detailObj} publicSrc={publicSrc}/> : <ContentText activeIndex={activeIndex} />
        }

      </div>
    )
  }
};
export default CSSModules(Project, PS, { "allowMultiple": true });