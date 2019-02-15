/* eslint-disable no-duplicate-case */
/* eslint-disable default-case */
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import Hideen from '@material-ui/core/Hidden';
import PT from './pagination.styl'

let allCount = 1;
class Pagination extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      allCount: 1
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {

  }
  handleClick(flag) {

    if (typeof flag === 'string') {
      let page = null;
      switch (flag) {
        case 'start':
          page = 1;
          break;
        case 'end':
          page = allCount;
          break;
        case 'prev':
          if (this.state.page === 1) {
            page = 1;
          } else {
            page = this.state.page - 1;
          }
          break;
        case 'next':
          if (this.state.page === allCount) {
            page = allCount;
          } else {
            page = this.state.page + 1;
          }
          break;
      }
      this.setState({ page })
      this.props.currentChange(page);
    } else {
      this.setState({ page: flag })
      this.props.currentChange(flag);
    }
  }
  render() {
    let { total, pageSize } = this.props;
    let count = parseInt((total / pageSize).toFixed(0));
    allCount = total % pageSize ? count + 1 : count;
    const Counts = [];
    for (let i = 0; i < allCount; i++) {
      Counts.push(i + 1);
    }
    return (
      <div styleName="pagination">
        <Hideen smDown>
          <span onClick={() => { this.handleClick('start') }}>首页</span>
          <span onClick={() => { this.handleClick('prev') }}>上一页</span>
          <div styleName="count">
            {Counts.map((o, i) => {
              return (<span styleName={this.state.page === o ? 'active' : ''} key={i} onClick={() => { this.handleClick(o) }}>{o}</span>)
            })}
          </div>
          <span onClick={() => { this.handleClick('next') }}>下一页</span>
          <span onClick={() => { this.handleClick('end') }}>尾页</span>
        </Hideen>
        <Hideen mdUp>
          <div styleName="count">
            {Counts.map((o, i) => {
              return (<span styleName={this.state.page === o ? 'active' : ''} key={i} onClick={() => { this.handleClick(o) }}>{o}</span>)
            })}
          </div>
        </Hideen>
      </div>
    );
  }
}

Pagination.propTypes = {
  total: PropTypes.number,
  pageSize: PropTypes.number
}
export default CSSModules(Pagination, PT, { "allowMultiple": true });