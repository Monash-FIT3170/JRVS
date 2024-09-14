/**
 * @file contentCarousel.js
 * @description A React component that implements a carousel for navigating through a series of content boxes. It provides controls for navigating forward and backward, and tracks which boxes have been seen.
 * @module Carousel
 * @requires React
 * @requires @mui/material/Box
 * @requires @mui/material/Button
 * @requires @mui/icons-material/ArrowBackIosNew
 * @requires @mui/icons-material/ArrowForwardIos
 * 
 * @param {Object} props - The component props.
 * @param {JSX.Element[]} props.boxes - An array of content boxes to be displayed in the carousel.
 * @param {function} props.onStatus - Callback function to notify the parent component about the completion status of the lesson.
 * @param {function} props.onIntroduction - Callback function to notify the parent component if the carousel is on the introduction slide.
 * @param {function} props.onSeenNum - Callback function to notify the parent component about the number of seen boxes.
 * @param {number} props.startingIndex - The initial index to start the carousel from.
 * 
 * @returns {JSX.Element} The rendered Carousel component.
 * 
 * @example
 * <Carousel 
 *   boxes={[<Box1 />, <Box2 />, <Box3 />]} 
 *   onStatus={(status) => console.log(status)} 
 *   onIntroduction={(isIntro) => console.log(isIntro)} 
 *   onSeenNum={(seen, index) => console.log(seen, index)} 
 *   startingIndex={0} 
 * />
 */


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