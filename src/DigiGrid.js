import React from 'react'
import './DigiGrid.css'
import Digi from './Digi'
import { v4 as uuidv4 } from 'uuid';

export default function DigiGrid({ width, height }) {

    const displayCharacters = ['=','*','#','$','@']
    const displayColors = ['stage1','stage2','stage3','stage4','stage5']

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
                        timeScale = {100} 
                        chars = {displayCharacters}
                        colors = {displayColors}
                        />
                    )
                })
            }
            </div>
            )
        })

    )
    
}
