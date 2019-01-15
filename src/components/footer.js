import React, {Component} from 'react';
import Hideen from '@material-ui/core/Hidden'
class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        这是底部
        <Hideen smDown>
        <div className="footer">
        smDown
        </div>
        </Hideen>
        <Hideen mdUp>
        <div className="footer">
        mdUp
        </div>
        </Hideen>
      </div>
    );
  }
}
export default Footer;