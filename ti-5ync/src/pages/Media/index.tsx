import React from "react"
//import { useState, useEffect } from 'react';
import { BasePage } from "../BasePage";
import { Box, Grid, makeStyles } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import {Items} from "../../hooks/useFormat/types";



export const Media = ( ) =>  {
  const location = useLocation();
  const navigation = useNavigate();

  const handleGoBack = () => {
    window.history.back();
  };
  const teste = (type:String)=>{
    if(type=='image'){
      return(
        <img src={`http://localhost:8080/video?filePath=${location.state.filePath}/${location.state.name}&type=${location.state.type}&ext=${location.state.ext}`}></img>
      )
    }
    else if(type=='video'){
      return(
      <video width="640" height="360" controls preload="auto">
        <source src={`http://localhost:8080/video?filePath=${location.state.filePath}/${location.state.name}&type=${location.state.type}&ext=${location.state.ext}`} type="video/mp4"/>
        Your browser does not support the video tag.
      </video>
      )
    }
  }

  return(
    <BasePage>
        <button onClick={handleGoBack}>Go Back</button>
        <Box
          p={2}
          height="100vh"
          display="flex"
          flexWrap="nowrap"
          alignItems="stretch"
          bgcolor="common.white"
        >
          <Box mr={2} pt={3} width="100%" maxWidth={240}>
            { teste(location.state.type) }
          </Box>
        </Box>
    </BasePage>
  );
}
