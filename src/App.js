import React, { Component } from 'react';
import './App.css';
import Logo from './components/Logo';
import Quote from './components/Quote';
import ListAndLookup from './components/ListAndLookup';

class App extends Component {

    render() {

        return (
            <div className="App">
                <header className="App-header">
                    <Logo />
                </header>
                <div className="Quote">
                    <Quote />
                </div>

                <ListAndLookup />
                
                <footer>
                    <Logo />
                </footer>
            </div>
        );
    }
}

export default App;
