import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.history.push('/others')
    console.log(this.props);
  }
  componentDidMount() {
    console.log(this.state.date);
  }
  render() {
    return (
      <div className="index-page">
        <Button variant="contained" color="primary" onClick={this.handleClick}>
          index-page
        </Button>
      </div>
    );
  }
}
export default Index;