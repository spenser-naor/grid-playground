import React, {Component} from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Digi.css'

export default class Digi extends Component {
    constructor(props){
        super(props);

        this.colorWays = {
            rainbow: ['rgb(0,0,250)','rgb(75,0,250)','rgb(150,0,250)','rgb(250,0,250)','rgb(250,0,0)','rgb(250,150,0)','rgb(250,250,0)','rgb(0,250,0)','rgb(0,250,250)','rgb(250,250,250)'],
            heatmap: ['rgb(50,50,150)','rgb(75,125,190)','rgb(150,200,225)','rgb(250,0,250)','rgb(255,255,200)','rgb(250,200,125)','rgb(250,150,100)','rgb(225,75,50)','rgb(150,0,50)','rgb(150,0,50)'],
            grayscale: ['rgb(0,0,0)','rgb(32,32,32)','rgb(64,64,64)','rgb(96,96,96)','rgb(128,128,128)','rgb(160,160,160)','rgb(192,192,192)','rgb(224,224,224)','rgb(255,255,255)','rgb(255,255,255)'],
        }

        this.characterWays = {
            numbers: ['0','1','2','3','4','5','6','7','8','9'],
            ascii: ['.',',','o','*','%','#','@','{*}','{#}','{@}'],
            grid: ['0','0','0','0','0','0','0','0','0','0']
        }

        this.state = {
            digiValue: 0,
            clickIds: {},
            countingDown: false,
            characterMode: 'ascii',
            colorMode: 'rainbow',
            // The react documentation suggests only pulling from 'this.props' and 'this.state' in the render method
            // so it seems that storing this list here rather than as a class variable is advisable.
            characters: ['.',',','o','*','%','#','@','{*}','{#}','{@}'],
            colors: this.colorWays['rainbow'],
            textStyle: {color: "black", backgroundColor:"transparent"},
            scale: ['10%','20%','30%','40%','50%','60%','70%','80%','90%','100%','100%']
        }
    }

    componentDidMount(){
        window.addEventListener('clickedrow:'+this.props.row+'col:'+this.props.col, this.callClick)
        window.addEventListener('characterMode', this.toggleCharacterMode)
        window.addEventListener('colorMode', this.toggleColorMode)
    }

    toggleCharacterMode = (e) =>{
        const newCharacters = this.characterWays[e.detail]
        var newStyle = {color: this.state.colors[this.state.digiValue], backgroundColor: "transparent"}
        const newMode = e.detail

        if (e.detail === 'grid'){
            newStyle['backgroundColor'] = this.state.colors[this.state.digiValue]
            newStyle['transform'] = 'scale('+this.state.scale[this.state.digiValue]+', '+this.state.scale[this.state.digiValue]
        }

        this.setState({characters:newCharacters, textStyle: newStyle, characterMode: newMode})
    }

    toggleColorMode = (e) =>{
        const newColors = this.colorWays[e.detail]
        const newMode = e.detail

        var newStyle = {color: newColors[this.state.digiValue]}

        if (this.state.characterMode === 'grid'){
            newStyle['backgroundColor'] = newColors[this.state.digiValue]
            newStyle['transform'] = 'scale('+this.state.scale[this.state.digiValue]+', '+this.state.scale[this.state.digiValue]
        }

        this.setState({colors:newColors, colorMode: newMode, textStyle: newStyle})
    }

    newClick = () => {
        const newClickId = uuidv4()
        this.toggleUp(newClickId)

        setTimeout(
            function() {
                const newUnClickId = '-'+uuidv4()
                this.toggleUp(newUnClickId)
            }
        .bind(this),
        (this.props.timeScale / this.props.speed.current.value) * this.props.length.current.value
    );
    }

    callClick = (e) => {
        setTimeout(
            function() {
                this.toggleUp(e.detail)
            }
            .bind(this),
            this.props.timeScale / this.props.speed.current.value
        );
    }

    // needs to be formatted as an arrow function to force a binding to the class. so weird
    toggleUp = (newClickId) => {
        if (!this.state.clickIds[newClickId]){
            var newDigiValue = this.state.digiValue

            if (newClickId[0] === '-'){
                newDigiValue--
            }
            else{
                newDigiValue++
            }

            var newClickIds = this.state.clickIds
            newClickIds[newClickId] = 1

            // I want to cap the value at 9 here. 10 make sthe grid unstable 
            if (newDigiValue > 9){
                newDigiValue = 9
            }

            var newStyle = {color: this.state.colors[newDigiValue]}

            if (this.state.characterMode === 'grid'){
                newStyle['backgroundColor'] = this.state.colors[newDigiValue]
                newStyle['transform'] = 'scale('+this.state.scale[newDigiValue]+', '+this.state.scale[newDigiValue]
            }

            this.setState({digiValue:newDigiValue, clickIds:newClickIds, textStyle: newStyle})

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
            <div onClick = { this.newClick }
            className = "numbers" >
                <div className = 'gridTile' style = { this.state.textStyle } >
                <div>
                {this.state.characters[this.state.digiValue]}
                </div>
                </div>
            </div>
        )
    }
}
