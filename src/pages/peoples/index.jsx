import React, { Component, useState, createRef } from 'react';
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
import validation from '../../utils/validation';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MyValidationForm, MyValidationInput, MyValidationButton } from "../../components/myForm";
import Tooltip from '@material-ui/core/Tooltip';
import { formDataPost } from '../../utils/request';

const minMenuData = [
  { name: '社会招聘', value: 1 },
  { name: '校园招聘', value: 2 },
  { name: '专业培训', value: 3 }
];

function TableContent() {
  const rows = contentText.tableList;
  const [openDetail, setOpenDetail] = useState(false);
  const [detailObj, setDetailObj] = useState({
    id: '', detail: ''
  });
  const [openForm, setOpenForm] = useState(false);
  const [values, setValues] = useState({
    name: '',
    phone: '',
    email: '',
    file: null,
  });
  const [tipDialog, setTipDialog] = useState({
    show: false,
    text: ""
  });
  const [loading, setLoading] = useState(false);
  let myForm = createRef();
  const [fileOpen, setFileOpen] = useState(false);
  function handleClick(obj) {
    setOpenDetail(true);
    let { id, detail } = obj;
    setDetailObj({ id, detail });
  }
  function handleCloseDetail() {
    setOpenDetail(false);
    setDetailObj({ id: '', detail: '' });
  }
  function handleOpenForm() {
    setOpenDetail(false);
    setOpenForm(true);
  }
  function handleCloseForm() {
    setOpenForm(false);
  }
  const handleChange = name => event => {
    if (name === 'file') {
      let file = event.target.files;
      if (file.length) {
        setValues({ ...values, [name]: file[0] });
      }
    } else {
      setValues({ ...values, [name]: event.target.value });
    }
  };

  const handleReset = () => {
    setValues({ 'name': '', 'phone': '', 'email': '', file: null });
    console.log(myForm.current)
  };
  
  const upload = () => {
    myForm.current.validateAll();
    if (values.file) {
      setFileOpen(false)
    } else {
      setFileOpen(true)
    }
    let formData = new FormData();
    formData.append('file', values.file);
    formData.append('name', values.name);
    formData.append('mail', values.email);
    formData.append('moblie', values.phone);
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    setLoading(true)
    formDataPost('/cv', formData, config).then(req => {
      if (req) {
        setTipDialog({ show: true, text: '提交成功！' });
      } else {
        setTipDialog({ show: true, text: '提交失败！请重新提交！' });
      }
      setTimeout(_ => {
        setTipDialog({ show: false, text: '' });
        setLoading(false)
      }, 1000)
    }).catch(_ => {
      console.log(_)
      setLoading(false)
    })
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
            <TableRow style={{ cursor: 'pointer' }} key={row.id} onClick={() => { handleClick(row) }}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.education}</TableCell>
              <TableCell>{row.num}</TableCell>
              <TableCell >{row.address}</TableCell>
              <TableCell >{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={openDetail} onClose={handleCloseDetail} classes={{ paperScrollPaper: PS.dialog }}>
        <div dangerouslySetInnerHTML={{ __html: detailObj.detail }} />
        <Hideen smDown>
          <Button variant="contained" color="primary" styleName="body-button" onClick={handleOpenForm}>我要应聘</Button>
        </Hideen>
      </Dialog>
      <Dialog open={openForm} onClose={handleCloseForm} classes={{ paperScrollPaper: PS.form }}>
        <div>
          <MyValidationForm ref={myForm}>
            <MyValidationInput
              label='姓名'
              name='name'
              value={values.name}
              onChange={handleChange('name')}
              validations={[validation.required]} />
            <MyValidationInput
              label='联系方式'
              name='phone'
              value={values.phone}
              onChange={handleChange('phone')}
              validations={[validation.required, validation.mobilePhone]} />
            <MyValidationInput
              label='Email'
              name='email'
              value={values.email}
              onChange={handleChange('email')}
              validations={[validation.required, validation.email]} />
            <Tooltip
              open={fileOpen}
              placement="bottom-start"
              title="上传文件不能为空！！"
            >
              <p>
                上传简历：
                <input name="myFile" type="file" onChange={handleChange('file')} />
              </p>
            </Tooltip>
            <div style={{ textAlign: 'center' }}>
              <MyValidationButton variant="contained" color="primary" styleName="body-button" onClick={upload} style={{ marginRight: '10px' }}>提交</MyValidationButton>
              <Button variant="contained" onClick={handleReset}>重置</Button>
            </div>
          </MyValidationForm>
        </div>
      </Dialog>
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
    newArr = newArr.concat(o);
  });
  let total = newArr.length;
  return (
    <div styleName="text-container">
      <div styleName="line" />
      {
        activeList.map((o, i) => {
          return (
            <div styleName="list-group" key={i}>
              <img styleName="img" src={require("../../assets/images/peoples/" + o.url)} alt="" />
              <div styleName="content">
                <h1>{o.title}</h1>
                <p styleName="date">发布时间：<span>{o.time}</span></p>
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
    childId = childId.replace(/\//g, '');//详情ID
    const publicSrc = `peoples/${activeIndex}/detail/${childId}/`;

    let detailObj = {};
    if (childId) {
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
          childId ? <Detail detailObj={detailObj} publicSrc={publicSrc} /> : <ContentText activeIndex={activeIndex} />
        }
      </div>
    )
  }
};
export default CSSModules(Project, PS, { "allowMultiple": true });