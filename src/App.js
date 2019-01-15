import React, { Component } from 'react';
import Footer from './components/footer';
import Router from './router'
import './assets/style/App.styl'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router />
        <Footer />
      </div>
    );
  }
}

export default App;
