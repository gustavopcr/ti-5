import { Button } from "@mui/material";
import React from "react";
import {Items} from "../../hooks/useFormat/types";
import { Item } from "electron";
/*
interface foo{
    doSomething: (i:Items)=>void
}
doSomething(i:Items):void
*//*
const foo = function(i:Item){
    console.log(i)
}
*/
export default function Item(props: {i:Items, foo(i:Items):void}){
    return( 
        <div>
            <Button onClick={ () => {props.foo(props.i)}}>{props.i.name}</Button>

        </div>
        
    )
}