import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import DetailView from './components/DetailView/DetailView';
import Navbar from './components/Navbar/Navbar';
// import Chart from './components/Chart/Chart';
import LandingPage from './components/LandingSec/LandingSec';
import Analyse from './components/LandingSec/Analyse/Analyse';
import ImportData from './components/LandingSec/ImportData/ImportData';
import SubNavbar from './components/Navbar/Sub-Navbar/Sub-Navbar';
import InputForm from './components/LandingSec/ImportData/FormInput/FormInput';

import './App.css';

class App extends Component {
  render(){
    return (
      <div className="App">

        <Navbar />
        <SubNavbar/>
        <div className="HomeScreen">

        </div>
        {/* Route Switcher from react-router-dom */}
        <Switch>
            <Route exact path="/" component={Analyse} />
            {/* <Route path="/analyse" component={Analyse} /> */}
            <Route path="/importData" component={ImportData} />
            <Route path="/detailview" component={DetailView} />
            <Route path="/InputForm" component={InputForm} />
        </Switch>
      </div>
    );
  }
}

export default App;
