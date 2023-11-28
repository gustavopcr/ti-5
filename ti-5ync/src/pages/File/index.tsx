import React from "react";
//import { useState, useEffect } from 'react';
import { BasePage } from "../BasePage";
import { Box } from "@mui/material";
import { useLocation } from 'react-router-dom';


export const File = ( ) =>  {
  const location = useLocation();
  const [data, setData] = React.useState({'type': 'teste', 'data': ''});
  React.useEffect(() => {
    fetch(`http://localhost:8080/arquivos/${location.state.name}?filePath=${location.state.filePath}`)
       .then((res) => res.json())
       .then((data) => {
          setData(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
  }, []);
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
            {data?.data}
          </Box>

          <Box p={3} width="100%" borderRadius={6} bgcolor="background.paper">
            aaa
          </Box>
        </Box>
    </BasePage>
  );
}
