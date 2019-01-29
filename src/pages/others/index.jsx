import React from 'react';
import { Route, Link } from 'react-router-dom';
import Hideen from '@material-ui/core/Hidden';
import Miaomu from '../miaomu';
import CallUs from '../callus';
import About from '../about';
import TreeMenu from '../../components/menu';
import OS from './other.styl';
import CSSModules from 'react-css-modules';
const Others = (router) => {
  const { match } = router;
  let menuType = router.location.pathname.split('/')[2];
  return (
    <div styleName="others-page">
      <Link to="/others" styleName='title' replace><img src={require('../../assets/images/201703031135283528.png')} alt="深圳市四季青园林股份有限公司" /></Link>
      <TreeMenu menuName={menuType} />
      <div styleName="other-title-bg" style={{backgroundImage:`url(${require(`../../assets/images/others/${menuType}.jpg`)})`}}/>
      <Route path={`${match.url}/miaomu/:id`} component={Miaomu} />
      <Route path={`${match.url}/callUs`} component={CallUs} />
      <Route path={`${match.url}/about/:id`} component={About} />
    </div>
  )
};

export default CSSModules(Others, OS, { "allowMultiple": true });