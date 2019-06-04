import React, { useState } from 'react';
import CSSModules from 'react-css-modules';
import DS from './detail.styl';
import ScrollArea from 'react-scrollbar';
import PropTypes from 'prop-types';
function Detail(props){
  const { detailObj,publicSrc,isMaiomu,video } = props;
  const [activeImg,setActiveImg] = useState(detailObj.images[0]);
  function handleClick(url) {
    setActiveImg(url)
  }
  let contentWidth = detailObj.images.length * 110;
  return (
    <div styleName="detail-container">
      <div styleName="line" />
      { isMaiomu ?
        <div styleName="detail-imgs">
          <video src={video} styleName="big" autoplay="autoplay" controls="controls">浏览器不支持video</video>
        </div>
        :
        <div styleName="detail-imgs">
          <img src={require('../../assets/images/'+publicSrc+activeImg)} alt="" styleName="big"/>
          <ScrollArea className='small-group' styleName='small-group' contentStyle={{width:`${contentWidth}px`}} vertical={false}>
            {
              detailObj.images.map((o,i)=>{
                return (
                  <img styleName={activeImg === o?'on':''} key={i} src={require('../../assets/images/'+publicSrc+o)} alt="" onClick={()=>{handleClick(o)}}/>
                )
              })
            }
          </ScrollArea>
        </div>
      }
      <div styleName="header">
        <ScrollArea className='header-box' styleName="header-box">
          <h1>{detailObj.head}</h1>
          <p>{detailObj.title}</p>
        </ScrollArea>
      </div>
      <div styleName="detail-text" dangerouslySetInnerHTML={{ __html: detailObj.text }} />
    </div>
  )
}
Detail.defaultProps = {
  isMaiomu: false,
  video:''
};
Detail.propTypes = {
  isMaiomu: PropTypes.bool,
  video: PropTypes.string
};
export default CSSModules(Detail, DS, { "allowMultiple": true });