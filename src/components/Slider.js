import React, { Component } from 'react'
import "./Slider.css"

export default class Slider extends Component {
    constructor(props){
        super(props);

        this.state = {
           sliderValue: this.props.default,
        }
    }

    setValue = () => {
        const newValue = this.props.sliderRef.current.value
        this.setState({sliderValue:newValue})
    }
    
    render() {
        return (
            <div>
            <label>
            {this.props.label}{this.state.sliderValue}
            <br></br>
            <input type="range" min={this.props.min} max={this.props.max} defaultValue = {this.props.default} onChange={this.setValue} className="slider" ref = {this.props.sliderRef} />
            </label>
            </div>
        )
    }
}
