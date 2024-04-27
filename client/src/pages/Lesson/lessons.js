import Navbar from "../../Components/navbar/Navbar";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios"
import "./lessons.css"

function Lessons() {
    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                backgroundColor: '#FFFDFD',
            }}
        >
            <AppBar position="static" elevation={0} sx={{padding: '60px', backgroundColor: '#FFFDFD'}}>
                    <h1 className="saira-font-container">JRVS</h1>
            </AppBar>

            

            <Box
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingBottom: '60px'
                }}
            >
                <Button variant="contained" className="button-font" sx={{':hover': {backgroundColor: '#2196F3'}, marginLeft: '60px', padding: '15px', borderRadius: '15px', backgroundColor: '#FFC93C'}}>Back</Button>
                <Button variant="contained" className="button-font" sx={{':hover': {backgroundColor: '#2196F3'}, marginRight: '60px', padding: '15px', borderRadius: '15px', backgroundColor: '#FFC93C'}}>Next</Button>
            </Box>
        </Box>
    );
}

export default Lessons