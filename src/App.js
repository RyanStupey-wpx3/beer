import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Logo from './components/Logo';
import InputBox from './components/InputBox';
import DisplayResults from './components/DisplayResults';
import TextBox from './components/TextBox';
import Rating from './components/Rating';
import Button from './components/Button';
import SearchButton from './components/SearchButton';
import Quote from './components/Quote';
import Brewery from './components/Brewery';

class App extends Component {

    constructor(){
        super();
        this.state = {
            searchInput: '',
            id: '',
            name: '',
            userName: '',
            userRating: '1',
            userNotes: '',
            description: '',
            abv: '',
            image: '',
            brewery: '',
            website: '',
            icon: '',
            beerList: [],
            update: false,
            breweryData: ''
        }
    }

    componentDidMount(){
        axios.get( `http://localhost:3535/api/mybeers` )
        .then( response => { this.setState({ beerList: response.data }) })
        .catch(err => console.log('Error: ' + err));
    }

    //Store search input
    updateInput(val){
        this.setState({ searchInput: val })
    }

    //Get beer from BreweryDB
    getBeer(e){
        e.preventDefault();
        let radios = document.getElementsByName('searchType');
        if(radios[0].checked){
            //Get beer
            if(this.state.searchInput){
                axios.get(`http://localhost:3535/api/beer/${this.state.searchInput}*`)
                .then(response => {
                    //Check for return data
                    if(response.data.hasOwnProperty('data')){
                        let {name, description, abv, labels, breweries} = response.data.data[0];
                        //Check if label exists
                        labels = labels && labels.hasOwnProperty('medium') ? labels.medium : ''
                        this.setState({
                            searchInput: '',
                            name: name,
                            description: description,
                            abv: abv + ' abv',
                            image: labels,
                            brewery: breweries[0].name,
                            website: breweries[0].website,
                            breweryData: ''
                        })
                    } else {
                        this.setState({
                            name: 'Beer not found',
                            description: '',
                            abv: '',
                            image: '',
                            brewery: '',
                            website: '',
                            breweryData: ''
                        })
                    }
                }).catch(err => console.log('Error: ' + err));
            } else {
                //Random beer
                axios.get(`http://localhost:3535/api/beer/random/random`)
                .then(response => {
                    //Check for return data
                    console.log(response);
                    if(response.data.hasOwnProperty('data')){
                        let {name, description, abv, labels, breweries} = response.data.data;
                        //Check if label exists
                        labels = labels && labels.hasOwnProperty('medium') ? labels.medium : ''
                        this.setState({
                            searchInput: '',
                            name: name,
                            description: description,
                            abv: abv + ' abv',
                            image: labels,
                            brewery: breweries[0].name,
                            website: breweries[0].website,
                            breweryData: ''
                        })
                    } else {
                        this.setState({
                            name: 'Beer not found',
                            description: '',
                            abv: '',
                            image: '',
                            brewery: '',
                            website: '',
                            breweryData: ''
                        })
                    }
                }).catch(err => console.log('Error: ' + err));
            }



        } else {

            //Get Brewery
            if(this.state.searchInput){
                axios.get(`http://localhost:3535/api/breweries/${this.state.searchInput}*`)
                .then(response => {
                    this.setState({
                        breweryData: response.data.data[0],
                        name: '',
                        description: '',
                        abv: '',
                        image: '',
                        brewery: '',
                        website: '',
                    })
                }).catch(err => console.log('Error: ' + err));
            } else {
                //Random brewery
                axios.get(`http://localhost:3535/api/brewery/random/random`)
                .then(response => {
                    this.setState({
                        breweryData: response.data.data,
                        name: '',
                        description: '',
                        abv: '',
                        image: '',
                        brewery: '',
                        website: '',
                    })
                }).catch(err => console.log('Error: ' + err));
            }


        }




    }

    //Update state on user input
    updateName(val){
        this.setState({ userName: val })
    }
    updateRating(val){
        this.setState({ userRating: val })
    }
    updateNotes(val){
        this.setState({ userNotes: val })
    }

    //Update Beer List
    addBeer(){
        let body = {
            id: this.state.id,
            name: this.state.userName,
            rating: this.state.userRating,
            notes: this.state.userNotes
        };

        //Update existing beer
        if(this.state.update){
            axios.put( `http://localhost:3535/api/mybeers/:id`, body)
            .then( response => {
                this.setState({
                    beerList: response.data,
                    id: '',
                    userName: '',
                    userRating: '1',
                    userNotes: '',
                    update: false
                })
            }).catch(err => console.log('Error: ' + err));
        } else {
            //Add new beer (Name must exist)
            if(this.state.userName){
                axios.post( `http://localhost:3535/api/mybeers`, body)
                .then( response => {
                    this.setState({
                        beerList: response.data,
                        id: '',
                        userName: '',
                        userRating: '1',
                        userNotes: '',
                        update: false
                    })
                }).catch(err => console.log('Error: ' + err));
            }
        }
    }

    //Load existing stats into state to prefill for edit
    updateBeer(id, name,rating,notes){
        this.setState({
            id: id,
            userName: name,
            userRating: rating,
            userNotes: notes,
            update: true
        })
    }

    removeBeer(id){
        axios.delete( `http://localhost:3535/api/mybeers/:id`)
        .then( response => {
            this.setState({
                beerList: response.data,
                id: '',
                userName: '',
                userRating: '1',
                userNotes: '',
                update: false
            })
        }).catch(err => console.log('Error: ' + err));
    }

    transfer(){
        this.setState({
            userName: this.state.name,
            userNotes: this.state.description
        })
    }

    render() {

        let active = this.state.name ? '' : 'hidden';

        //Prepare beer entries for display
        let list = this.state.beerList.map((beer,i) => {
            //If more than default 'Add beer to your list' entry, return each entry that is not the 'add' message
            if(this.state.beerList.length > 1 && i > 0){
                return (
                    <div key={i}>
                        <h2>
                            <span className="beerName">{beer.name}</span> <i className="fa fa-star yellow"></i> {beer.rating}

                        </h2>
                        <span className="pointer" onClick={() => this.updateBeer(beer.id, beer.name, beer.rating, beer.notes)}>
                            <i className="fa fa-pencil"></i> Edit
                        </span> &nbsp;
                        <span className="pointer" onClick={() => this.removeBeer(beer.id)}>
                            <i className="fa fa-trash"></i> Delete
                        </span><br/><br/>
                        <span className="label">Notes: </span><br/>
                        <h5 className="beer-notes">{beer.notes}</h5>
                    </div>
                )
            } else if(this.state.beerList.length === 1){
                //If only default msg exists, display msg
                return <h3 key={i}>{beer}</h3>
            } else {
                //Else present for msg skip when entries are present
                return '';
            }
        });

        return (
            <div className="App">
                <header className="App-header">
                    <Logo />
                </header>
                <div className="Quote">
                    <Quote />
                </div>
                <div className="wrapper">
                    <div className="userList">
                        <h1>My Beers</h1>
                        <InputBox
                            class="InputBox"
                            placeholder="Beer Name"
                            val={this.state.userName}
                            onChange={e => this.updateName(e.target.value)} />
                        <br/>

                        <TextBox
                            onChange={e => this.updateNotes(e.target.value)}
                            placeholder="Notes about this beer...."
                            val={this.state.userNotes} />

                        <div className="rating-wrapper">
                            <Rating change={e => this.updateRating(e.target.value)} val={this.state.userRating} />
                            <Button click={() => this.addBeer()} text="Pour" />
                        </div>
                        <div className="beer-list">
                            {list}
                        </div>
                    </div>
                    <div className="beerLookup">
                        <h1>Beer Lookup</h1>
                        <form>
                            <InputBox
                                class="InputBox beerLookupBox"
                                placeholder="Leave blank for random"
                                value={this.state.searchInput}
                                onChange={e => this.updateInput(e.target.value)} />

                            <SearchButton
                                click={(e) => this.getBeer(e)} />

                            <input type="radio" name="searchType" value="beer" defaultChecked />Beer &nbsp;
                            <input type="radio" name="searchType" value="brewery" />Brewery
                        </form>
                        <DisplayResults
                            name={this.state.name}
                            abv={this.state.abv}
                            brewery={this.state.brewery}
                            website={this.state.website}
                            description={this.state.description}
                            image={this.state.image} />

                        <Brewery data={this.state.breweryData} />

                        <Button click={() => this.transfer()} text="Add to my list" class={active} />
                    </div>
                </div>
                <footer>
                    <Logo />
                </footer>
            </div>
        );
    }
}

export default App;
