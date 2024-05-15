import React, { useState } from 'react';
import { Button, Typography, Card } from '@mui/material';
import { styled } from '@mui/system';

const StyledForm = styled('form')({
  marginTop: '20px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
});

const StyledDiv = styled(Card)({
  width: '50%',
  padding: '20px',
  border: '2px solid black'
});

const StyledQuestionText = styled(Typography)({
  fontSize: '20px',
});

const StyledItem = styled('div')({
  padding: '10px',
  margin: '5px',
  backgroundColor: '#f0f0f0',
  border: '1px solid #ccc',
  borderRadius: '5px',
  cursor: 'pointer',
  userSelect: 'none',
  ':hover': {
    backgroundColor: '#e0e0e0',
  },
});

const ReorderingQuestion = ({ data }) => {
  const defaultOrder = ['1', '2', '3']; 
  const defaultCorrectOrder = ['1', '2', '3']; 
  const [order, setOrder] = useState(data.item.order || defaultOrder);
  const [correctOrder, setCorrectOrder] = useState(data.item.correctOrder || defaultCorrectOrder);
  const [answerStatus, setAnswerStatus] = useState('');

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedItem = e.dataTransfer.getData('text/plain');
    const draggedItemIndex = order.indexOf(draggedItem);
    const newOrder = [...order.slice(0, draggedItemIndex), ...order.slice(draggedItemIndex + 1)];
    const dropZoneIndex = e.target.getAttribute('data-index');
    const newOrderWithItem = [
      ...newOrder.slice(0, dropZoneIndex),
      draggedItem,
      ...newOrder.slice(dropZoneIndex)
    ];
    setOrder(newOrderWithItem);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const checkAnswer = () => {
    if (JSON.stringify(order) === JSON.stringify(correctOrder)) {
      setAnswerStatus('Correct!');
    } else {
      setAnswerStatus('Incorrect...');
    }
  };

  return (
    <StyledForm>
      <StyledDiv>
        <StyledQuestionText variant="body1">{data.item.questionText}</StyledQuestionText>
        <div>
          {order.map((item, index) => (
            <StyledItem
              key={item}
              data-index={index}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              draggable
              className="draggable-item"
              onDragStart={(e) => e.dataTransfer.setData('text/plain', item)}
            >
              {item}
            </StyledItem>
          ))}
        </div>
        <Button sx={{ mt: 1, borderRadius: '10px' }} variant="outlined" onClick={checkAnswer}>Check Answer</Button>
        {answerStatus && <Typography>{answerStatus}</Typography>}
      </StyledDiv>
    </StyledForm>
  );
};

export default ReorderingQuestion;





