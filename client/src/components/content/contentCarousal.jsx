import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import '../../pages/Lesson/lessons.css'

export default function Carousel({boxes, onStatus, onIntroduction}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [seenBoxes, setSeenBoxes] = useState(new Set());

    const sendStatusToParent = (hasCompletedLesson) => {
        if (onStatus) {
            onStatus(hasCompletedLesson);
        }
    }

    const sendIntroStatusToParent = (isOnIntroduction) => {
        if (onIntroduction) {
            onIntroduction(isOnIntroduction);
        }
    }

    const handlePrev = () => {
        console.log(activeIndex);
        setActiveIndex((newIndex) => (activeIndex > 0 ? activeIndex - 1 : boxes.length - 1));
        setSeenBoxes(seenBoxes.add(activeIndex));
        console.log(seenBoxes);
        const hasCompletedLesson = seenBoxes.size === boxes.length;
        const isOnIntroduction = activeIndex === 0;
        console.log(activeIndex);
        console.log(isOnIntroduction);
        sendStatusToParent(hasCompletedLesson);
        sendIntroStatusToParent(isOnIntroduction);
    };

    const handleNext = () => {
        console.log(activeIndex);
        setActiveIndex((newIndex) => (activeIndex < boxes.length - 1 ? activeIndex + 1 : 0));
        setSeenBoxes(seenBoxes.add(activeIndex));
        const hasCompletedLesson = seenBoxes.size === boxes.length;
        const isOnIntroduction = activeIndex === 0;
        console.log(activeIndex);
        console.log(isOnIntroduction);
        sendStatusToParent(hasCompletedLesson);
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