import Navbar from "../../Components/navbar/Navbar";
import MultipleChoiceQ from "../../Components/QuestionTypes/mcq";
import TrueFalse from "../../Components/QuestionTypes/truefalse";
import ShortAnswer from "../../Components/QuestionTypes/shortans";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios"
export default function Quizzes() {

  const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/quizzes")
      .then(response => setItems(response.data))
      
      .catch(error => console.error(error));
  }, []);

  console.log(items)

    const mappedQuestions = items.map((item, index) => {
      if (item.type === 'MultipleChoiceQ') {
        return<MultipleChoiceQ data={{item, index}} />
        
      
      } 
      else if (item.type === 'TrueFalse'){
        return <TrueFalse data={{item, index}} />;
      }
      
      
      else if (item.type === 'ShortAnswer'){
        return <ShortAnswer data={{item, index}}></ShortAnswer>
      }
      else {
        return null; 
      }
    });

  


  return (
    <div className="Home">
      <Navbar></Navbar>

   
      <header className="App-header">
        <Typography sx= {{fontSize: 80}}>
          Quiz topic 1
        </Typography>
      {mappedQuestions}
      </header>
      

    </div>
  );

}
