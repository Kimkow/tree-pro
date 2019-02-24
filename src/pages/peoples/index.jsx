import React, { Component, useState,useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CSSModules from 'react-css-modules';
import MinMenu from '../../components/minMenu';
import Hideen from '@material-ui/core/Hidden';
import PS from './peoples.styl';
import contentText from './text';
import Pagination from '../../components/pagination';
import Detail from '../../components/detailOther';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Form from 'react-validation/build/form';
import InputF from 'react-validation/build/input';
import validation from '../../utils/validation';

const minMenuData = [
  { name: '社会招聘', value: 1 },
  { name: '校园招聘', value: 2 },
  { name: '专业培训', value: 3 }
];

function TableContent() {
  const rows = contentText.tableList;
  const [ openDetail, setOpenDetail ] = useState(false);
  const [ detailObj, setDetailObj ] = useState({
    id:'',detail:''
  });
  const [ openForm, setOpenForm ] = useState(true);
  const [values, setValues] = useState({
    name: '',
    phone: '',
    email: '',
    file: null,
  });
  const [ruleMsg, setRuleMsg] = useState({
    name: false,
    phone: false,
    email: false,
    file: null,
  });

  function handleClick(obj){
    setOpenDetail(true);
    let { id,detail} = obj;
    setDetailObj({id,detail});
  }
  function handleCloseDetail() {
    setOpenDetail(false);
    setDetailObj({id:'',detail:''});
  }
  function handleOpenForm() {
    setOpenDetail(false);
    setOpenForm(true);
  }
  function handleCloseForm() {
    setOpenForm(false);
  }

  function validationForm(name,value) {
    let ruleList = [];
    switch (name) {
      case 'name':
        ruleList = [validation.required];
        break;
      case 'email':
        ruleList = [validation.required,validation.email];
        break;
      case 'phone':
        ruleList = [validation.required,validation.phone];
        break;
      case 'file':
        ruleList = [validation.file];
        break;
      default :
        break;
    }
    let msg = false;
    for(let i = 0;i<ruleList.length;i++){
      if(msg){
        break;
      }else {
        msg = ruleList[i](value);
      }
    }
    setRuleMsg({ ...ruleMsg, [name]: msg });
    return msg;
  }
  const upload = () =>{
    let formData = new FormData();
    let isPass = false;
    console.log(ruleMsg);
    validationForm('phone','');
    console.log(ruleMsg);
    validationForm('email','');
    console.log(ruleMsg);
    // console.log(validationForm('phone',''));
    /*Object.keys(values).forEach(o=>{

      if(!validationForm(o,values[o])){
        isPass = true;
      }else {
        isPass = false;
      }
    });*/
    // console.log(isPass);
    for(let j in values){
      formData.append(j,values[j]);
    }
  };

  const handleChange = name => event => {
    if(name === 'file') {
      let reader=new FileReader();
      let file = event.target.files;
      if(file.length) {
        if (!/image/.test(file[0].type)) {//操作文本
          reader.readAsText(file[0]);
          setValues({ ...values, [name]: file[0] });
        }
      }
    }else {
      setValues({ ...values, [name]: event.target.value });
    }
    validationForm(name,event.target.value)
  };
  return (
    <Paper styleName='paper'>
      <Table styleName='table'>
        <TableHead>
          <TableRow>
            <TableCell>职位名称</TableCell>
            <TableCell>学历</TableCell>
            <TableCell>招聘人数</TableCell>
            <TableCell>工作地点</TableCell>
            <TableCell>发布时间</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow style={{cursor:'pointer'}} key={row.id} onClick={()=>{handleClick(row)}}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.education}</TableCell>
              <TableCell>{row.num}</TableCell>
              <TableCell >{row.address}</TableCell>
              <TableCell >{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={openDetail} onClose={handleCloseDetail} classes={{paperScrollPaper:PS.dialog}}>
        <div dangerouslySetInnerHTML={{ __html: detailObj.detail }} />
        <Hideen smDown>
          <Button variant="contained" color="primary" styleName="body-button" onClick={handleOpenForm}>我要应聘</Button>
        </Hideen>
      </Dialog>
      <Dialog open={openForm} onClose={handleCloseForm} classes={{paperScrollPaper:PS.form}}>
        <div>
          <FormControl error={ !!ruleMsg.name } fullWidth>
            <InputLabel>姓名</InputLabel>
            <Input
              value={values.name}
              onChange={handleChange('name')}
            />
            <FormHelperText>{ ruleMsg.name || '' }</FormHelperText>
          </FormControl>
          <FormControl error={ !!ruleMsg.phone } fullWidth>
            <InputLabel>联系方式</InputLabel>
            <Input
              value={values.phone}
              onChange={handleChange('phone')}
            />
            <FormHelperText>{ ruleMsg.phone || '' }</FormHelperText>
          </FormControl>
          <FormControl error={ !!ruleMsg.email } fullWidth>
            <InputLabel>Email</InputLabel>
            <Input
              value={values.email}
              onChange={handleChange('email')}
            />
            <FormHelperText>{ ruleMsg.email || '' }</FormHelperText>
          </FormControl>
          <p>上传简历：<input name="18157_0" type="file" onChange={handleChange('file')}/></p>
          <div style={{textAlign:'center'}}>
            <Button variant="contained" color="primary" styleName="body-button" onClick={upload} style={{marginRight:'10px'}}>提交</Button>
            <Button variant="contained"> 重置</Button>
          </div>
        </div>
      </Dialog>
    </Paper>
  )
}

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
  let newArr = [];
  contentObj.forEach(o => {
    newArr  = newArr.concat(o);
  });
  let total =  newArr.length;
  return (
    <div styleName="text-container">
      <div styleName="line"/>
      {
        activeList.map((o, i) => {
          return (
            <div styleName="list-group" key={i}>
              <img styleName="img" src={require("../../assets/images/peoples/" + o.url)} alt="" />
              <div styleName="content">
                <h1>{o.title}</h1>
                <p styleName="date">发布时间：<span>{ o.time }</span></p>
                <p>{o.text}</p>
                <Button variant="contained" component='a' href={`#/others/peoples/${activeIndex}/${o.value}`} color="primary" styleName="body-button">查看详情</Button>
              </div>
            </div>
          )
        })
      }
      <Pagination total={total} pageSize={3} currentChange={handleChangePage} />
    </div>
  )
}

function ContentText(props) {
  let { activeIndex } = props;
  let valueCount = parseInt(activeIndex);
  const DefaultPS = CSSModules(DefaultContent, PS, { "allowMultiple": true });
  const NormalContentPS = CSSModules(NormalContent, PS, { "allowMultiple": true });
  const TableContentPs = CSSModules(TableContent, PS, { "allowMultiple": true });
  if (valueCount === 3) {
    return <NormalContentPS activeIndex={activeIndex} />;
  } else if (valueCount === 1) {
    return <TableContentPs />;
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
    const publicSrc = `peoples/${activeIndex}/detail/${childId}/`;

    let detailObj = {};
    if(childId) {
      detailObj = contentText.detailList[activeIndex][childId];//详情内容
    }

    return (
      <div styleName="container">
        <Hideen smDown>
          <div styleName="menu">
            <div styleName="img-group">
              <img src={require('../../assets/images/peoples/menu.png')} alt="" />
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