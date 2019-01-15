import React, { Component } from 'react';
import './assets/style/App.css';
import Router from './router'
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        这是头部
        </header>
        <Router />
      </div>
    );
  }
}

export default App;
