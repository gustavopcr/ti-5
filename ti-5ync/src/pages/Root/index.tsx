import { Button } from "@mui/material";
import { IconButton, Dialog, Box, Typography } from '@mui/material';
import React from "react";
import { useNavigate } from "react-router-dom";
import { BasePage } from "../BasePage";
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import {Items} from "../../hooks/useFormat/types";
import Item from "../Item";
import {File} from "../../pages"
import Modal from 'react-modal';


const url = 'http://localhost:8080/arquivos?filePath='
export const Root: React.FC = () => {

  const navigation = useNavigate();
  const [arquivos, setArquivos] = useState([]);
  const [filePath, setFilePath] = useState<String>('');
  const [file, setFile] = useState<File | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('aloalaoPOST')
    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    console.log('teste: ');
    console.log('http://localhost:8080/upload?filePath=${filePath}')
    try {
      const response = await fetch(`http://localhost:8080/upload?filePath=${filePath}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('File uploaded successfully.');
      } else {
        alert('File upload failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error uploading the file.');
    }
  };

  //mudar de Items para Item dps. Nome no plural é ruim
  const foo = ( data:Items ) => {
    console.log("data: " + data.type)
    if(data.isDir){
      if(filePath.trim() == ''){
        setFilePath(data.name);
      }else{
        setFilePath(`${filePath}${data.name}/`);
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
      <div>
        <button onClick={() => setModalIsOpen(true)}>Open Modal</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          ariaHideApp={false} // For accessibility, in a real app consider proper configuration
        >
          <h2>Modal Form</h2>
                <h1>File Upload</h1>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
          <button onClick={() => setModalIsOpen(false)}>Close Modal</button>
        </Modal>
      </div>

      <Button onClick={handleVoltar}>Voltar</Button>
      { arquivos.map(  (data:Items) =>        
        bt(data)
      )}
    </div>
    </BasePage>
  );
};
