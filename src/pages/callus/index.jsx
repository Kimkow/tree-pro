import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import CU from './callus.styl';
import BMap from 'BMap'

let map;

function createMap() {
  map = new BMap.Map("mapContainer"); // 创建Map实例
  map.centerAndZoom(new BMap.Point(114.098351, 22.574093), 17); // 初始化地图,设置中心点坐标和地图级别
  let MapPoint = new BMap.Point(114.098351, 22.574093);//定义一个中心点坐标
  map.centerAndZoom(MapPoint, 17);//设定地图的中心点和坐标并将地图显示在地图容器中
  map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
  map.enableScrollWheelZoom();//启用地图滚轮放大缩小
  map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
  map.enableKeyboard();//启用键盘上下左右键移动地图
  map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
  var ctrl_ove = new BMap.OverviewMapControl({ anchor: 3, isOpen: 1 });
  map.addControl(ctrl_ove);
  //向地图中添加比例尺控件
  var ctrl_sca = new BMap.ScaleControl({ anchor: 2 });
  map.addControl(ctrl_sca);
  //标注点数组
  var markerArr = [{ title: "深圳四季青园林", content: "电话：0755-82403817<br/>传真：0755-82426333<br/>地址：深圳市罗湖区上步北路2006号", point: "114.098342|22.574135", isOpen: 0, icon: { w: 23, h: 25, l: 46, t: 21, x: 9, lb: 12 } }
  ];
  for (let i = 0; i < markerArr.length; i++) {
    let json = markerArr[i];
    let p0 = json.point.split("|")[0];
    let p1 = json.point.split("|")[1];
    let point = new BMap.Point(p0, p1);
    let marker = new BMap.Marker(point);
    let label = new BMap.Label(json.title, { "offset": new BMap.Size(json.icon.lb - json.icon.x + 10, -20) });
    marker.setLabel(label);
    map.addOverlay(marker);
    label.setStyle({
      borderColor: "#808080",
      color: "#333",
      cursor: "pointer"
    });
    let _iw = createInfoWindow(json);
    let _marker = marker;
    _marker.addEventListener("click", function () {
      this.openInfoWindow(_iw);
    });
    _iw.addEventListener("open", function () {
      _marker.getLabel().hide();
    })
    _iw.addEventListener("close", function () {
      _marker.getLabel().show();
    })
    label.addEventListener("click", function () {
      _marker.openInfoWindow(_iw);
    })
    if (!!json.isOpen) {
      label.hide();
      _marker.openInfoWindow(_iw);
    }
  }
  function createInfoWindow(json) {
    return new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>" + json.content + "</div>");
  }
}

class CallUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  componentDidMount() {
    createMap();
  }
  render() {
    return (
      <div className="index-page">
        <div styleName="phone-number">
          <img src={require("../../assets/images/201703031532113211.jpg")} alt="phone" />
          <p>电话 : 0755-82403817</p>
        </div>
        <div styleName="fax">
          <img src={require("../../assets/images/201703031532203220.jpg")} alt="phone" />
          <p>传真 : 0755-82403817</p>
        </div>
        <div styleName="address">
          <img src={require("../../assets/images/201703031532293229.jpg")} alt="phone" />
          <p>地址 : 深圳市罗湖区上步北路2006号</p>
        </div>
        <div className="mapContainer">
          <div id="mapContainer" style={{width:'100%',height:'485px'}}></div>
        </div>
      </div>
    );
  }
}
export default CSSModules(CallUs, CU, { "allowMultiple": true });