import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import SandwichBuilder from './containers/SandwichBuilder/SandwichBuilder';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Layout>
            <SandwichBuilder/>
          </Layout>


      </div>
    );
  }
}

export default App;
