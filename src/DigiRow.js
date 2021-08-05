import React from 'react'
import Digi from './Digi'

import { v4 as uuidv4 } from 'uuid';

export default function DigiRow({ width, col }) {
    
    function createMyRow(){
        const myRow = []
        for( var i=0; i < width; i++ ){
            i = String(i)
            if (i.length == 2){
                i = '0'+i;
            }
            if (i.length == 1){
                i = '00'+i;
            }
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
