import React, { useState } from 'react';
import CSSModules from 'react-css-modules';
import DS from './detail.styl';
function Detail(props){
  const { detailObj,publicSrc } = props;
  const [activeImg,setActiveImg] = useState(detailObj.images[0]);

  function handleClick(url) {
    setActiveImg(url)
  }
  return (
    <div styleName="detail-container">
      <div styleName="line" />
      <div styleName="detail-imgs">
        <img src={require('../../assets/images/'+publicSrc+activeImg)} alt="" styleName="big"/>
        <div styleName="small-group">
          {
            detailObj.images.map((o,i)=>{
              return (
                <img styleName={activeImg === o?'on':''} key={i} src={require('../../assets/images/'+publicSrc+o)} alt="" onClick={()=>{handleClick(o)}}/>
              )
            })
          }
        </div>
      </div>
      <div styleName="header">
        <div styleName="header-box">
          <h1>{detailObj.head}</h1>
          <p>{detailObj.title}</p>
        </div>
      </div>
      <div styleName="detail-text" dangerouslySetInnerHTML={{ __html: detailObj.text }} />
    </div>
  )
}
export default CSSModules(Detail, DS, { "allowMultiple": true });