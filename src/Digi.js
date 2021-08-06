import React, {Component} from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Digi.css'

export default class Digi extends Component {
    constructor(props){
        super(props);

        this.state = {
            digiValue: 0,
            clickIds: {},
            countingDown: false,
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
            this.props.timeScale
        );
    }

    countDown = (countValue) => {
        let count = countValue
        //for (let count = countValue; count > 0; count--) {
        //while (count >= 0){
        if (count === 0){
            setTimeout(
                function() {
                    //const newDigiValue = countValue
                    //const counting = true
                    this.setState({digiValue:count, countDown: false})
                }
                .bind(this),
                this.props.timeScale*10
            );
        }

        else{

            setTimeout(
                function() {
                    //const newDigiValue = countValue
                    //const counting = true
                    count--
                    this.setState({digiValue:count, countDown: true})
                    this.countDown(count)
                }
                .bind(this),
                this.props.timeScale*10
            );
        }
        // while (count > 0){
        //     setTimeout(
        //         function() {
        //             const newDigiValue = this.state.digiValue - 1
        //             const counting = true
        //             this.setState({digiValue:newDigiValue, countDown: counting})
        //         }
        //         .bind(this),
        //         20
        //     );
        // }
        // const newerDigiValue = 0
        // const alsoCounting = false
        // this.setState({digiValue:newerDigiValue, countDown: alsoCounting})
        
    //}
    }

    newClick = () => {
        const newClickId = uuidv4()
        this.toggle(newClickId)
    }

    // needs to be formatted as an arrow function to force a binding to the class. so weird
    toggle = (newClickId) => {
        if (!this.state.clickIds[newClickId]){

            //const newDigiValue = !this.state.digiValue ? 1 : 0 //simple toggle

            const newDigiValue = this.state.digiValue + 1

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
            
            if (this.state.countingDown === false){
                //console.log('countdown')
                const counting = true
                this.setState({countDown: counting})
                this.countDown(newDigiValue)
            }
        
        }
    }
    render() {
        return (
            <div onClick={this.newClick} className={this.props.colors[this.state.digiValue]}>
                {this.state.digiValue}
            </div>
        )
    }
}
