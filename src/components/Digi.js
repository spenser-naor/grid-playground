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
            characterMode: 'ascii',
            colorMode: 'rainbow',
            // The react documentation suggests only pulling fro 'this.props' and 'this.state' in the render method
            // so it seems that storing this list here rather than as a class variable is advisable.
            characters: ['.',',','o','*','%','#','@','{*}','{#}','{@}'],
            colors: ['rgb(0,0,250)','rgb(75,0,250)','rgb(150,0,250)','rgb(250,0,250)','rgb(250,0,0)','rgb(250,150,0)','rgb(250,250,0)','rgb(0,250,0)','rgb(0,250,250)','rgb(250,250,250)'],
            textStyle: {color: "black", backgroundColor:"transparent"},
            scale: ['10%','20%','30%','40%','50%','60%','70%','80%','90%','100%','100%']
        }
    }

    componentDidMount(){
        //console.log('mounted '+ this.props.row + ' ' + this.props.col)
        //const digiLocation = 'clickedrow:'+this.props.row+'col:'+this.props.col
        window.addEventListener('clickedrow:'+this.props.row+'col:'+this.props.col, this.callClick)
        window.addEventListener('unClickedrow:'+this.props.row+'col:'+this.props.col, this.callUnClick)
        window.addEventListener('characterMode', this.characterMode)
        window.addEventListener('colorMode', this.colorMode)
    }

    characterMode = (e) =>{
        var newCharacters = ['0','1','2','3','4','5','6','7','8','9']
        var newGridStyle = {color: "black", backgroundColor: "transparent"}
        const newMode = e.detail
        if (e.detail === 'ascii'){
            newCharacters = ['.',',','o','*','%','#','@','{*}','{#}','{@}']
        }
        if (e.detail === 'grid'){
            newGridStyle = {color: this.state.colors[this.state.digiValue],
                            backgroundColor: this.state.colors[this.state.digiValue],
                            transform: 'scale('+this.state.scale[this.state.digiValue]+', '+this.state.scale[this.state.digiValue]}
        }
        this.setState({characters:newCharacters, textStyle: newGridStyle, characterMode: newMode})
    }

    colorMode = (e) =>{
        var newColors = ['rgb(0,0,250)','rgb(75,0,250)','rgb(150,0,250)','rgb(250,0,250)','rgb(250,0,0)','rgb(250,150,0)','rgb(250,250,0)','rgb(0,250,0)','rgb(0,250,250)','rgb(250,250,250)']
        const newMode = e.detail
        if (e.detail === 'heatmap'){
            newColors = ['rgb(50,50,150)','rgb(75,125,190)','rgb(150,200,225)','rgb(250,0,250)','rgb(255,255,200)','rgb(250,200,125)','rgb(250,150,100)','rgb(225,75,50)','rgb(150,0,50)','rgb(150,0,50)']
        }
        if (e.detail === 'grayscale'){
            newColors = ['rgb(0,0,0)','rgb(32,32,32)','rgb(64,64,64)','rgb(96,96,96)','rgb(128,128,128)','rgb(160,160,160)','rgb(192,192,192)','rgb(224,224,224)','rgb(255,255,255)','rgb(255,255,255)']
        }

        var newStyle = {color: newColors[this.state.digiValue]}

        if (this.state.characterMode === 'grid'){
            newStyle['backgroundColor'] = newColors[this.state.digiValue]
            newStyle['transform'] = 'scale('+this.state.scale[this.state.digiValue]+', '+this.state.scale[this.state.digiValue]
        }


        this.setState({colors:newColors, colorMode: newMode, textStyle: newStyle})
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

    callUnClick = (e) => {
        setTimeout(
            function() {
                this.toggleDown(e.detail)
            }
            .bind(this),
            this.props.timeScale / this.props.speed.current.value
        );
    }

    // RETAIN FOR SECONDARY MODE
    // countDown = (countValue) => {

    //     this.setState({digiValue:countValue})

    //     if (this.props.row === 10 && this.props.col === 10){
    //         console.log(countValue)
    //     }

    //     let count = countValue
    //     if (count === 0){
    //         this.setState({countDown: false})
    //     }

    //     else{
    //         setTimeout(
    //             function() {
    //                 count--
    //                 this.setState({digiValue:count})
    //                 // unfortunately I had to code this recursively to get it to work
    //                 // and iterative approach utilizing "while" just locks up the program
    //                 this.countDown(count) 
    //             }
    //             .bind(this),
    //             this.props.timeScale*10
    //         );
    //     }
    // }

    newClick = () => {
        const newClickId = uuidv4()
        this.toggleUp(newClickId)

        setTimeout(
            function() {
                const newUnClickId = uuidv4()
                this.toggleDown(newUnClickId)
            }
        .bind(this),
        (this.props.timeScale / this.props.speed.current.value) * this.props.length.current.value
    );
    }

    // needs to be formatted as an arrow function to force a binding to the class. so weird
    toggleUp = (newClickId) => {
        if (!this.state.clickIds[newClickId]){
            var newDigiValue = this.state.digiValue + 1

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
            

            // RETAIN FOR SECONDARY MODE
            // if (this.state.countingDown === false){
            //     //console.log('countdown')
            //     const counting = true
            //     this.setState({countDown: counting})
            //     this.countDown(newDigiValue)
            // }
    
        }
    }

    toggleDown = (newUnClickId) => {
        if (!this.state.clickIds[newUnClickId]){
            var newDigiValue = this.state.digiValue - 1

            var newUnClickIds = this.state.clickIds
            newUnClickIds[newUnClickId] = 1

            if (newDigiValue < 0){
                newDigiValue = 0
            }

            var newStyle = {color: this.state.colors[newDigiValue]}

            if (this.state.characterMode === 'grid'){
                newStyle['backgroundColor'] = this.state.colors[newDigiValue]
                newStyle['transform'] = 'scale('+this.state.scale[newDigiValue]+', '+this.state.scale[newDigiValue]
            }

            this.setState({digiValue:newDigiValue, clickIds:newUnClickIds, textStyle: newStyle})

            const clickArray = [
                'row:'+(this.props.row+1)+'col:'+(this.props.col),
                'row:'+(this.props.row-1)+'col:'+(this.props.col),
                'row:'+(this.props.row)+'col:'+(this.props.col+1),
                'row:'+(this.props.row)+'col:'+(this.props.col-1)
            ]
            clickArray.map(digiLocation => window.dispatchEvent(new CustomEvent('unClicked'+digiLocation,{ detail: newUnClickId })))

        }
    }


    render() {
        return (
            <div onClick={this.newClick}
            className="numbers" >
                <div className='gridTile' style={this.state.textStyle} >
                <div>
                {this.state.characters[this.state.digiValue]}
                </div>
                </div>
            </div>
        )
    }
}
