import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
class CallUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }
  componentDidMount() {
    console.log(this.props.location)
  }
  render() {
    return (
      <div className="index-page">
        <Button variant="contained" color="primary">
          联系我们
        </Button>
      </div>
    );
  }
}
export default CallUs;