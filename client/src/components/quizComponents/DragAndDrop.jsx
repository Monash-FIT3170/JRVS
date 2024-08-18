import React, { useEffect, useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import {
    ListItem,
    ListItemText,
    Grid,
    Typography
} from '@mui/material';
import StyledBox from "./StyledBox";
//import BotBox from "../../components/content/botBox";


// NEW 



//uses react-smooth-dnd
export default function DragAndDrop({ question, index, setSelection, userValues }) {

    let order = userValues[question.questionText] || question.options
    useEffect(() => {
        setSelection(question.questionText, order);
    }, [question]);


    //We can set the selection first before we do anything just in case
    const onDrop = ({ removedIndex, addedIndex }) => {
        //We remove the item with splice, then add the item back to the new index
        const [removedOption] = order.splice(removedIndex, 1);
        order.splice(addedIndex, 0, removedOption);
        setSelection(question.questionText, order);
    }

    const mappedIndex = (order).map((item, idx) => (
        <Draggable key={idx}>
            <ListItem sx={{
                my: '8px',
                ml: '10px',
                display: 'flex',
                alignItems: 'center',
                fontFamily: '"Roboto-Regular", Helvetica',
            }}  >
                <ListItemText
                    primary={idx + 1}
                    primaryTypographyProps={{ fontSize: '18px', fontWeight: 500 }} />
            </ListItem>
        </Draggable>

    ))

    const mappedOptions = (order).map((item) => (
        <Draggable key={item}>
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

                <ListItemText primary={item} sx={{ fontSize: 700 }} />
            </ListItem>
        </Draggable>
    ))
    return (
        <Grid container>
            <Grid item xs={12} display="flex" justifyContent="center">
                <StyledBox >
                    <Grid xs={12}>
                        <Typography sx={{ display: "inline", color: '#3ca3ee', fontSize: '30px', lineHeight: '60px', fontWeight: 700, mr: '5px' }}>Question {index + 1}</Typography>
                        <Typography sx={{ display: "inline", color: '#000000', fontFamily: '"Roboto-Regular", Helvetica', fontSize: '16px', lineHeight: '32px', }}></Typography>{/*Needs fixing to display total question fix another time */}
                        <Typography sx={{ display: 'block', color: '#000000', fontFamily: '"Roboto-Regular", Helvetica', fontSize: '16px', my: '20px' }}>{question.questionText}</Typography>

                        <Grid container>
                            <Grid xs={1}>
                                <Container lockAxis="x,y">
                                    {mappedIndex}
                                </Container>
                            </Grid>


                            <Grid xs={11}>
                                <Container lockAxis="y" onDrop={onDrop}>
                                    {mappedOptions}
                                </Container>
                            </Grid>

                        </Grid>
                    </Grid>
                </StyledBox>

            </Grid>
        </Grid>
    );

}      