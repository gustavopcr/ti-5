import { Button } from "@mui/material";
import { IconButton, Dialog, Box, Typography } from '@mui/material';
import React from "react";
import { useNavigate } from "react-router-dom";
import { BasePage } from "../BasePage";
import { useState, useEffect } from 'react';
import {Items} from "../../hooks/useFormat/types";
import Item from "../Item";
import {File} from "../../pages"

const url = 'http://localhost:8080/arquivos?filePath='

const handleFile = (url:string, newPath:string) =>{
  url += newPath;
}
export const Root = () => {

  const navigation = useNavigate();
  const [arquivos, setArquivos] = useState([]);
  const [filePath, setFilePath] = useState<String | null>('');

  //mudar de Items para Item dps. Nome no plural é ruim
  const foo = ( data:Items ) => {
    console.log("data: " + data.type)
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

  const handleFile = async (data:Items)=>{
    try{
      console.log("TYPE: " + data.type)
      if(data.type == 'text'){
        console.log('/file')
        navigation('/file', { state: {name: data.name, filePath: filePath}} );
      }else if(data.type == 'image' || data.type == 'video'){
        console.log('/media')
        navigation('/media', { state: {name: data.name, filePath: filePath, type: data.type, ext: data.ext}} );
      }
    }catch(err){
      console.log(err);
    }
  };

  const bt = (data:Items) =>{
    if(data.isDir){
      return(<Item i={data} foo={foo}></Item>)
    }else{
      return(<Item i={data} foo={handleFile}></Item>)
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
        bt(data)
      )}
    </div>
    </BasePage>
  );
};
