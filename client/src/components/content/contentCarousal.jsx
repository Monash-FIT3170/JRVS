import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import '../../pages/Lesson/lessons.css'

export default function Carousel({boxes, onStatus, onIntroduction}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [seenBoxes, setSeenBoxes] = useState(new Set().add(0));

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
        const newIndex = activeIndex > 0 ? activeIndex - 1 : boxes.length - 1;
        setActiveIndex(newIndex);
        setSeenBoxes(prevSeenBoxes => {
            const newSeenBoxes = new Set(prevSeenBoxes);
            newSeenBoxes.add(newIndex);
            const hasCompletedLesson = seenBoxes.size >= boxes.length - 1;
            sendStatusToParent(hasCompletedLesson);
            return newSeenBoxes;
        });
        console.log(seenBoxes);
        
        const isOnIntroduction = newIndex === 0;
        sendIntroStatusToParent(isOnIntroduction);
    };

    const handleNext = () => {
        const newIndex = activeIndex < boxes.length - 1 ? activeIndex + 1 : 0;
        setActiveIndex(newIndex);
        setSeenBoxes(prevSeenBoxes => {
            const newSeenBoxes = new Set(prevSeenBoxes);
            newSeenBoxes.add(newIndex);
            const hasCompletedLesson = seenBoxes.size >= boxes.length - 1;
            sendStatusToParent(hasCompletedLesson);
            return newSeenBoxes;
        });
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