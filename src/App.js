import React, { Component } from 'react';
import './App.css';
import SearchBox from './components/SearchBox'

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
                <h1><i className="fa fa-beer"></i> Beer Me</h1>
            </header>

            <div className="wrapper">
                <div className="userList">
                    <h1>My Beers</h1>
                </div>
                <div className="beerLookup">
                    <h1>Beer Lookup</h1>
                    <SearchBox />
                </div>
            </div>

        </div>
    );
  }
}

export default App;
