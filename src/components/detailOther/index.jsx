import React from 'react';
import CSSModules from 'react-css-modules';
import DOS from './detaiOther.styl';
function Detail(props){
  const { detailObj,publicSrc } = props;
  return (
    <div styleName="detail-container">
      <div styleName="line" />
      <p styleName="title">{detailObj.head}</p>
      <p styleName="stip">发布时间：<span>{detailObj.time}</span></p>
      <p styleName="text-header">{detailObj.head}</p>
      <p styleName="text-title">{detailObj.title}</p>
      <p dangerouslySetInnerHTML={{ __html: detailObj.text }} />
      <p styleName="detail-imgs">
        {
          detailObj.images.map((o,i)=>{
            return (
              <img key={i} src={require('../../assets/images/'+publicSrc+o)} alt=""/>
            )
          })
        }
      </p>
    </div>
  )
}
export default CSSModules(Detail, DOS, { "allowMultiple": true });