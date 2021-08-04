import React, { useRef } from 'react'
import DigiRow from './DigiRow'
import './DigiGrid.css'
import Digi from './Digi'
import { v4 as uuidv4 } from 'uuid';

export default function DigiGrid({ width, height }) {
    
    const nodeRef = useRef()
        
    //const grid = createGrid()

    function createMyCols(){
        const myCol = []
        for( var i=0; i < height; i++ ){
            myCol.push(i)
        }
        return myCol
    }

    function createMyRow(){
        const myRow = []
        for( var i=0; i < width; i++ ){
            myRow.push(i)
        }
        return myRow
    }

    // function createGrid(){
    //     var gridArray = []

    //     gridArray.push(<Digi key={uuidv4()} row = {1} col ={1} click={handleMouseClick} />)
    //     gridArray.push(<Digi key={uuidv4()} row = {1} col ={2} click={handleMouseClick} />)

    //     return gridArray

    // }
    

    function handleMouseClick(clickedDigi){
        console.log(clickedDigi)
    }

    return (
        createMyCols().map(myCol => {
            return (
            <div key={uuidv4()} className="flexbox-container">
                {createMyRow().map(myDigi => {
                    return (
                        <Digi key={uuidv4()} row = {myDigi} col ={myCol} click={handleMouseClick} />
                    )
                })
            }
            </div>
            )
        })

    )
    
}
