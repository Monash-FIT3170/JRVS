import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import '../../pages/Lesson/lessons.css'

export default function Carousel({boxes, onStatus, onIntroduction, onSeenNum, startingIndex}) {
    const [activeIndex, setActiveIndex] = useState(startingIndex ? startingIndex : 0);
    const [seenBoxes, setSeenBoxes] = useState(new Set().add(0));

    const sendStatusToParent = (hasCompletedLesson) => {
        if (onStatus) {
            onStatus(hasCompletedLesson);
        }
    }

    const sendSeenNumberToParent = (seenNumber, newIndex) => {
        if (onSeenNum) {
            onSeenNum(seenNumber, newIndex);
        }
    }

    const sendIntroStatusToParent = (isOnIntroduction) => {
        if (onIntroduction) {
            onIntroduction(isOnIntroduction);
        }
    }

    const handlePrev = () => {
        const newIndex = activeIndex > 0 ? activeIndex - 1 : boxes.length - 1;
        const newSeenBoxes = new Set(seenBoxes);
        newSeenBoxes.add(newIndex);
        setActiveIndex(newIndex);
        setSeenBoxes(newSeenBoxes);
        console.log(seenBoxes);
        
        const hasCompletedLesson = seenBoxes.size >= boxes.length - 1;
        sendSeenNumberToParent(newSeenBoxes.size, newIndex);
        sendStatusToParent(hasCompletedLesson);
        const isOnIntroduction = newIndex === 0;
        sendIntroStatusToParent(isOnIntroduction);
    };

    const handleNext = () => {
        console.log('test')
        const newIndex = activeIndex < boxes.length - 1 ? activeIndex + 1 : 0;
        const newSeenBoxes = new Set(seenBoxes);
        newSeenBoxes.add(newIndex);
        setActiveIndex(newIndex);
        setSeenBoxes(newSeenBoxes);
        const hasCompletedLesson = seenBoxes.size >= boxes.length - 1;
        sendSeenNumberToParent(newSeenBoxes.size, newIndex);
        sendStatusToParent(hasCompletedLesson);
        const isOnIntroduction = newIndex === 0;
        sendIntroStatusToParent(isOnIntroduction);
        
    };



    return (
        <Box sx={{ maxWidth: '75%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Button onClick={handlePrev} sx={{color: '#FFFFFF'}}><ArrowBackIosNewIcon/></Button>
        <Box>{boxes[activeIndex]}</Box>
        <Button onClick={handleNext} sx={{color: '#FFFFFF'}}><ArrowForwardIosIcon/></Button>
        </Box>
    );
};