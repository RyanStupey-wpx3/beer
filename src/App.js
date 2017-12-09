import React, { Component } from 'react';
import './App.css';
import Logo from './components/Logo';
import BeerLookup from './components/BeerLookup';
import BeerList from './components/BeerList';

class App extends Component {
    constructor(){
        super();
        this.state = {
            picture: '',
        }
    }


    componentDidMount(){

    }

  render() {
    return (
        <div className="App">
            <header className="App-header">
                <Logo />
            </header>

            <div className="wrapper">
                <div className="userList">
                    <h1>My Beers</h1>
                    <BeerList />
                </div>
                <div className="beerLookup">
                    <h1>Beer Lookup</h1>
                    <BeerLookup />
                </div>
            </div>

        </div>
    );
  }
}

export default App;
