import React from "react";
//import { useState, useEffect } from 'react';
import { BasePage } from "../BasePage";
import { Box } from "@mui/material";
import { useLocation } from 'react-router-dom';
import {Items} from "../../hooks/useFormat/types";
/*
<video width="640" height="360" controls>
            <source src={`http://localhost:8080/video?filePath=${location.state.filePath}/${location.state.name}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          */

export const Media = ( ) =>  {
  const location = useLocation();
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
