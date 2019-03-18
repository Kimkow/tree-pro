import React, { Component, useState, createRef } from 'react';
import CSSModules from 'react-css-modules';
import Hideen from '@material-ui/core/Hidden';
import CU from './callus.styl';
import BMap from 'BMap'
import MinMenu from '../../components/minMenu';
import validation from '../../utils/validation';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MyValidationForm, MyValidationInput, MyValidationButton } from "../../components/myForm";
import { postData } from '../../api/miaomu'

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
  var markerArr = [{
    title: "深圳四季青园林",
    content: "电话：0755-82403817<br/>传真：0755-82426333<br/>地址：深圳市罗湖区上步北路2006号",
    point: "114.098342|22.574135",
    isOpen: 0,
    icon: { w: 23, h: 25, l: 46, t: 21, x: 9, lb: 12 }
  }
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

const minMenuData = [
  { name: '联系我们', value: 1 },
  { name: '留言专区', value: 2 },
];

class Path1 extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    createMap();
  }
  render() {
    return (
      <div styleName="content">

        <div styleName="phone-number">
          <img src={require("../../assets/images/201703031532113211.jpg")} alt="" />
          <p>电话 : 0755-82403817</p>
        </div>
        <div styleName="fax">
          <img src={require("../../assets/images/201703031532203220.jpg")} alt="" />
          <p>传真 : 0755-82403817</p>
        </div>
        <div styleName="address">
          <img src={require("../../assets/images/201703031532293229.jpg")} alt="" />
          <p>地址 : 深圳市罗湖区上步北路2006号</p>
        </div>
        <div className="mapContainer">
          <div id="mapContainer" style={{ width: '100%', height: '485px' }}></div>
        </div>
      </div>
    )
  }
}

function Path2() {
  const [values, setValues] = useState({
    mobilePhone: '',
    phone: '',
    email: '',
    address: '',
    remark: ''
  });
  const [tipDialog, setTipDialog] = useState({
    show: false,
    text: ""
  });
  const [loading, setLoading] = useState(false);
  let myForm = createRef();

  const upload = () => {
    myForm.current.validateAll();
    const { mobilePhone, phone, email, address, remark } = values
    let data = {
      loacl: address,
      mail: email,
      message: remark,
      mobile: mobilePhone,
      phone
    }
    setLoading(true)
    postData(data).then(req => {
      if (req) {
        setTipDialog({ show: true, text: '提交成功！' });
      } else {
        setTipDialog({ show: true, text: '提交失败！请重新提交！' });
      }
      setTimeout(_ => {
        setTipDialog({ show: false, text: '' });
        setLoading(false)
      }, 1000)
    }).catch(_=>{
      console.log(_);
      setLoading(false);
    })
  };
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div styleName="content">
      <MyValidationForm ref={myForm} styleName='path2'>
        <MyValidationInput
          label='电话'
          name='phone'
          value={values.phone}
          onChange={handleChange('phone')}
          validations={[validation.required, validation.phone]} />
        <MyValidationInput
          label='手机'
          name='mobilePhone'
          value={values.mobilePhone}
          onChange={handleChange('mobilePhone')}
          validations={[validation.required, validation.mobilePhone]} />
        <MyValidationInput
          label='Email'
          name='email'
          value={values.email}
          onChange={handleChange('email')}
          validations={[validation.required, validation.email]} />
        <MyValidationInput
          label='地址'
          name='address'
          value={values.address}
          onChange={handleChange('address')} />
        <MyValidationInput
          label='留言'
          name='textarea'
          multiline={true}
          value={values.remark}
          onChange={handleChange('remark')} />
        <div style={{ textAlign: 'center' }}>
          <MyValidationButton variant="contained" color="primary" styleName="body-button" onClick={upload} style={{ marginRight: '10px' }}>提交</MyValidationButton>
        </div>
      </MyValidationForm>
      <Dialog open={loading}>
        {!tipDialog.show ?
          <div style={{ width: '150px', height: '150px', position: 'relative' }}>
            <CircularProgress size={30} thickness={5} style={{
              color: '#c0a264',
              position: 'absolute',
              top: '40%',
              left: '40%',
              zIndex: 99999
            }} />
          </div>
          :
          <div style={{ padding: '20px' }}>{tipDialog.text}</div>
        }
      </Dialog>
    </div>
  )
}

class CallUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  render() {
    const Path1CU = CSSModules(Path1, CU, { "allowMultiple": true });
    const Path2CU = CSSModules(Path2, CU, { "allowMultiple": true });
    let path = this.props.match.path.split(':')[0];
    let activeIndex = this.props.match.params.id;
    return (
      <div styleName="index-page">
        <Hideen smDown>
          <div styleName="menu">
            <div styleName="img-group">
              <img src={require('../../assets/images/callus/callus_menu.png')} alt="" />
              <img src={require('../../assets/images/icont_tip_bg2.png')} alt="" />
            </div>
            <MinMenu listData={minMenuData} menuPath={path} activeIndex={activeIndex} />
          </div>
        </Hideen>
        <Hideen mdUp>
          <MinMenu listData={minMenuData} menuPath={path} activeIndex={activeIndex} />
        </Hideen>
        {activeIndex === '1' && <Path1CU />}
        {activeIndex === '2' && <Path2CU />}
      </div>
    );
  }
}

export default CSSModules(CallUs, CU, { "allowMultiple": true });