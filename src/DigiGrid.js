import React from 'react'
import './DigiGrid.css'
import Digi from './components/Digi'
import { v4 as uuidv4 } from 'uuid';

export default function DigiGrid({ width, height, length, speed, settings }) {

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

    return (
        createMyCols().map(myCol => {
            return (
            <div key={uuidv4()} className="flexbox-container">
                {createMyRow().map(myDigi => {
                    return (
                        <Digi 
                        key={uuidv4()} 
                        row = {myDigi} 
                        col ={myCol} 
                        timeScale = {200} 
                        length = {length}
                        speed = {speed}
                        settings = {settings}
                        />
                    )
                })
            }
            </div>
            )
        })

    )
    
}
