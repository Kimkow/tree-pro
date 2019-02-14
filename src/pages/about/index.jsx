import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import MinMenu from '../../components/minMenu';
import Hideen from '@material-ui/core/Hidden';
import AS from './about.styl';
import contentText from './text';
import Pagination from '../../components/pagination';


const minMenuData = [
  { name: '公司简介', value: 1 },
  {
    name: '分支机构', value: 2,
    children: [
      { name: '深港花卉中心', value: 3 },
      { name: '湖南长沙子公司', value: 4 },
      { name: '安徽子公司', value: 5 },
      { name: '江西九江子公司', value: 6 },
      { name: '湖北分公司', value: 7 },
      { name: '安徽分公司', value: 8 },
      { name: '湖南永州苗木基地', value: 9 }
    ]
  },
  { name: '荣誉资质', value: 10 },
  { name: '企业文化', value: 11 },
  { name: '历史沿革', value: 12 },
];

function OtherContent10() {

  function handleChangePage() {
    console.log(1234);
  }
  return (
    <div styleName="text-container">
      <Pagination total={14} pageSize={6} currentChange={handleChangePage} />
    </div>
  )
}
function NormalContent(props) {
  const { activeIndex } = props;
  const contentObj = contentText[activeIndex];
  let img = '';
  if (contentObj.url) {
    img = <img src={require(`../../assets/images/${contentObj.url}`)} alt="" />
  }
  return (
    <div styleName="text-container">
      <div styleName="line"></div>
      <h1>{contentObj.h1}</h1>
      {
        contentObj.list.map((o, i) => {
          return (<p key={i}>{o}</p>)
        })
      }
      {img}
    </div>
  )
}
function ContentText(props) {
  let { activeIndex } = props;
  let valueCount = parseInt(activeIndex);
  const NormalContentAS = CSSModules(NormalContent, AS, { "allowMultiple": true });
  const OtherContent10AS = CSSModules(OtherContent10, AS, { "allowMultiple": true });
  if (valueCount < 10) {
    return <NormalContentAS activeIndex={activeIndex}/>
  }else if(valueCount === 10){
    return (<OtherContent10AS activeIndex={activeIndex}/>)
  }
}

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isChange: true
    }
  }

  componentDidMount() {
  }
  render() {
    const { isChange } = this.state;
    let path = this.props.match.path.split(':')[0];
    let activeIndex = this.props.match.params.id;
    
    return (
      <div styleName="container">
        <Hideen smDown>
          <div styleName="menu">
            <div styleName="img-group">
              <img src={require('../../assets/images/about/menu.png')} alt="" />
              <img src={require('../../assets/images/icont_tip_bg2.png')} alt="" />
            </div>
            <MinMenu listData={minMenuData} menuPath={path} activeIndex={activeIndex} isChange={isChange} />
          </div>
        </Hideen>
        <Hideen mdUp>
          <MinMenu listData={minMenuData} menuPath={path} activeIndex={activeIndex} isChange={isChange} />
        </Hideen>
        <ContentText activeIndex={activeIndex}/>
      </div>
    )
  }
};
export default CSSModules(About, AS, { "allowMultiple": true });