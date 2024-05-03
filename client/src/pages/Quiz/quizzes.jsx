
import MultipleChoiceQ from "../../components/QuestionTypes/mcq";
import TrueFalse from "../../components/QuestionTypes/truefalse";
import ShortAnswer from "../../components/QuestionTypes/shortans";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";

import { useApi } from '../../context/ApiProvider.jsx';

export default function Quizzes() {
  const { getData } = useApi();
  const [items, setItems] = useState([]);
  const [isQuizLoading, setIsQuizLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await getData('api/quizzes');
        setItems(responseData);
        setIsQuizLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getData])

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

      <header className="App-header">
        <Typography sx= {{fontSize: 80}}>
          Quiz topic 1
        </Typography>
      {isQuizLoading ? <p>loading...</p> : mappedQuestions}
      </header>
      

    </div>
  );

}
