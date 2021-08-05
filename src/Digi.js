import React, {Component} from 'react';
import { v4 as uuidv4 } from 'uuid';

export default class Digi extends Component {
    constructor(props){
        super(props);
        this.state = {
            digiValue: 0,
            clickIds: {},
        }
    }

    componentDidMount(){
        //console.log('mounted '+ this.props.row + ' ' + this.props.col)
        const digiLocation = 'clickedrow:'+this.props.row+'col:'+this.props.col
        //console.log(digiLocation)
        window.addEventListener(digiLocation, this.callClick)
    }
    callClick = (e) => {
        setTimeout(
            function() {
                this.toggle(e.detail)
            }
            .bind(this),
            20
        );
    }

    newClick = () => {
        const newClickId = uuidv4()
        this.toggle(newClickId)
    }

    // needs to be formatted as an arrow function to force a binding to the class. so weird
    toggle = (newClickId) => {
        if (!this.state.clickIds[newClickId]){

            const newDigiValue = !this.state.digiValue ? 1 : 0

            var newClickIds = this.state.clickIds
            newClickIds[newClickId] = 1

            this.setState({digiValue:newDigiValue, clickIds:newClickIds})

            const clickArray = [
                'row:'+(this.props.row+1)+'col:'+(this.props.col),
                'row:'+(this.props.row-1)+'col:'+(this.props.col),
                'row:'+(this.props.row)+'col:'+(this.props.col+1),
                'row:'+(this.props.row)+'col:'+(this.props.col-1)
            ]
            clickArray.map(digiLocation => window.dispatchEvent(new CustomEvent('clicked'+digiLocation,{ detail: newClickId })))
        }
    }
    render() {
        return (
            <div onClick={this.newClick}>
                {this.state.digiValue}
            </div>
        )
    }
}
