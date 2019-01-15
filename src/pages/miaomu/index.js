import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
class MiaoMu extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.history.push('/')
  }
  render() {
    return (
      <div className="index-page">
        <Button variant="contained" color="primary" onClick={this.handleClick}>
          苗木
        </Button>
      </div>
    );
  }
}
export default MiaoMu;