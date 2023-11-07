import { Button } from "@mui/material";
import { IconButton } from '@mui/material';
import React from "react";
import { useNavigate } from "react-router-dom";
import { BasePage } from "../BasePage";
import { useState, useEffect } from 'react';
import {Items} from "../../hooks/useFormat/types";
import Item from "../Item";

const url = 'http://localhost:8080/arquivos?filePath='

const handleFile = (url:string, newPath:string) =>{
  url += newPath;
}
export const Root = () => {

  const navigate = useNavigate();
  const [arquivos, setArquivos] = useState([]);
  const [filePath, setFilePath] = useState<String | null>('');

  //mudar de Items para Item dps. Nome no plural é ruim
  const foo = ( data:Items ) => {
    if(data.isDir){
      if(filePath.trim() == ''){
        setFilePath(data.name);
      }else{
        setFilePath(`${filePath}/${data.name}`);
      }
    }else{
      //abrir para ver arquivo
      console.log("else: " + data);
    }
  }

  const handleVoltar = ()=>{
    var fp:String = filePath;
    if(fp.trim() !== ''){
        const ind:number = fp.lastIndexOf('/');
        if(fp.trim().length > 0){
            console.log("trim!!!");
            fp = fp.substring(0, ind);
            setFilePath(fp)
        }
    }
  }
  const bt = () =>{
    if(filePath.trim() !== ''){
      return(<Button onClick={handleVoltar}></Button>)
    }else{
      return(<></>)
    }
  }

  useEffect(() => {
    
    fetch(url+filePath)
       .then((res) => res.json())
       .then((data) => {
          setArquivos(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
  }, [filePath]);

  return (
    <BasePage>
    <div>
      <Button onClick={handleVoltar}>Voltar</Button>
      { arquivos.map(  (data:Items) =>
        <Item i={data} foo={foo}></Item>
      )}
    </div>
    </BasePage>
  );
};
