import React, {Component} from 'react';

export default class Digi extends Component {
    constructor(props){
        super(props);
        this.state = {
            row: this.props.row,
            col: this.props.col,
            digiValue: 0,
        }
        // this.row = 0;
        // this.col = 0;
        // this.digiValue = 0;
    }
    toggle = () => {
        const newDigiValue = !this.state.digiValue ? 1 : 0
        this.setState({digiValue:newDigiValue})
        //this.digiValue = !this.digiValue
        console.log(this.state.row,this.state.col)
        // return (
        //     <div onClick={toggle}>
        //         {digiValue}
        //     </div>
        // )
    }
    render() {
        return (
            <div onClick={this.toggle}>
                {this.state.digiValue}
            </div>
        )
    }
}
