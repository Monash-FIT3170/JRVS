import React, { useState } from "react";

import { Container, Draggable } from "react-smooth-dnd";


import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    Grid,
    Typography

} from '@mui/material';
import StyledBox from "./StyledBox";
import ReorderIcon from '@mui/icons-material/Reorder';

//uses react-smooth-dnd
export default function Reorder({ question, index, setSelection, userValues }) {

    const [items, setItems] = useState(question.options);



    const mappedOptions = items.map((item) => (
        <Draggable key={item.value}>

            <ListItem sx={{
                border: 1,
                borderColor: '#ccc',
                borderRadius: '8px',
                padding: '8px',
                margin: '8px',
                display: 'flex',
                alignItems: 'center',
                fontFamily: '"Roboto-Regular", Helvetica',
                width: '50%'

            }}  >
                <ReorderIcon />
                <ListItemText primary={item.option} />


            </ListItem>
        </Draggable>
    ))
    return (
        <Grid container>
            <Grid item={true} xs={12} display="flex" justifyContent="center">
                <StyledBox >


                    <Typography sx={{ display: "inline", color: '#3ca3ee', fontSize: '30px', lineHeight: '60px', fontWeight: 700, mr: '5px' }}>Question {index + 1}</Typography>
                    <Typography sx={{ display: "inline", color: '#000000', fontFamily: '"Roboto-Regular", Helvetica', fontSize: '16px', lineHeight: '32px', }}></Typography>{/*Needs fixing to display total question fix another time */}
                    <Typography sx={{ display: 'block', color: '#000000', fontFamily: '"Roboto-Regular", Helvetica', fontSize: '16px', my: '20px' }}>{question.questionText}</Typography>

                    <Container lockAxis="y" onDrop={null}>
                        {mappedOptions}
                    </Container>

                </StyledBox>

            </Grid>
        </Grid>
    );

}      