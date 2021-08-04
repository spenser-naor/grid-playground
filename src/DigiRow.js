import React from 'react'
import Digi from './Digi'

import { v4 as uuidv4 } from 'uuid';

export default function DigiRow({ width, col }) {
    
    function createMyRow(){
        const myRow = []
        for( var i=0; i < width; i++ ){
            myRow.push(i)
        }
        return myRow
    }

    return (
        createMyRow().map(myDigi => {
            return <Digi key={uuidv4()} row = {myDigi} col ={col} />
        })
    )
}
