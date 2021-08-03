import React from 'react'
import DigiRow from './DigiRow'
import './DigiGrid.css'
import { v4 as uuidv4 } from 'uuid';

export default function DigiGrid({ width, height }) {
    
        
    function createMyCols(){
        const myCol = []
        for( var i=0; i < height; i++ ){
            myCol.push(i)
        }
        return myCol
        
    }

    return (
        createMyCols().map(myCol => {
            return (
            <div className="flexbox-container">
            <DigiRow key={uuidv4()} width = { width } col ={myCol} />
            </div>
            )
        })
    )
    
}
