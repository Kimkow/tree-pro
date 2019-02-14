import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import Hideen from '@material-ui/core/Hidden';
import PT from './pagination.styl'

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1
    };
  }
  componentDidMount() {
  }
  render() {
    let { total, pageSize } = this.props;
    let count = parseInt((total / pageSize).toFixed(0));
    count = total % pageSize ? count + 1 : count;
    console.log(count);
    return (
      <div styleName="pagination">
        <Hideen smDown>
          <span>首页</span>
          <span>上一页</span>
          <div styleName="count"><span>1</span></div>
          <span>下一页</span>
          <span>尾页</span>
        </Hideen>
        <Hideen mdUp>
          <div styleName="count"><span>1</span></div>
        </Hideen>
      </div>
    );
  }
}
export default CSSModules(Footer, PT, { "allowMultiple": true });