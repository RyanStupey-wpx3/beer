import React, {Component} from 'react';

class Brewery extends Component {
    constructor(props){
        super(props);
        this.state = {
            brewery: '',
            name: '',
            image: '',
            established: '',
            description: '',
            classification: ''
        }
    }


    render(){
        let active = this.props.data.name ? '' : 'hidden';
        return (
            <div className={active}>
                <h2>{this.props.data.name}</h2>
                <h3>{this.props.data.established}</h3>
                <p>Est. {this.props.data.description}</p>
            </div>
        )
    }
}

export default Brewery;
