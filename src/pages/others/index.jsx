import React from 'react';
import {Route, Link} from 'react-router-dom';
import Miaomu from '../miaomu';
import CallUs from '../callus';
const Others = ( {match} ) => {
  return (
    <div className="others-page">
      这是嵌套进来的东西
      <Link to={`${match.url}/miaomu`} replace>miaomu</Link>
      <Route path={`${match.url}/miaomu`} component={Miaomu}/>
      <Route path={`${match.url}/callUs`} component={CallUs}/>
    </div>
  )
};

export default Others