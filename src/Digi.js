import React, {Component} from 'react';

export default class Digi extends Component {
    constructor(props){
        super(props);
        this.state = {
            digiValue: 0,
        }
    }

    // componentDidMount(){
    //     console.log('mounted '+ this.props.row + ' ' + this.props.col)
    //     window.addEventListener("click", this.callClick)
    // }

    // callClick= () => {
    //     console.log('click called')
    //     this.props.cluck('test')
    // }

    // needs to be formatted as an arrow function to force a binding to the class. so weird
    toggle = () => {
        this.props.click(this)
        const newDigiValue = !this.state.digiValue ? 1 : 0
        this.setState({digiValue:newDigiValue})
        //console.log(this.props.row,this.props.col)
    }
    render() {
        return (
            <div onClick={this.toggle}>
                {this.state.digiValue}
            </div>
        )
    }
}
