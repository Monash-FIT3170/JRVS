import React, { useState } from 'react';

function ReorderingQuestion({ questionText, question, correctOrder }) {
  const [items, setItems] = useState(question);

  const [isCorrect, setIsCorrect] = useState(false);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    const draggedIndex = e.dataTransfer.getData('index');
    const updatedItems = [...items];
    const draggedItem = updatedItems[draggedIndex];
    updatedItems.splice(draggedIndex, 1);
    updatedItems.splice(index, 0, draggedItem);
    setItems(updatedItems);
    checkCorrectness(updatedItems);
  };

  const checkCorrectness = (updatedItems) => {
    setIsCorrect(JSON.stringify(updatedItems) === JSON.stringify(correctOrder));
  };

  return (
    <div className="card">
      <div className="card-header">
      </div>
      <div className="card-body">
        <h4>{questionText}</h4>
        <p>Drag and drop the items to reorder them correctly:</p>
        <ul className="reordering-list">
          {items.map((item, index) => (
            <li
              key={index}
              className="reordering-item"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
            >
              {item}
            </li>
          ))}
        </ul>
        {isCorrect && <p className="text-success">Correct!</p>}
      </div>
    </div>
  );
}

export default ReorderingQuestion;

