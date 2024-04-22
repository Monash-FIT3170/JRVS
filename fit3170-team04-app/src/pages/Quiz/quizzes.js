import Navbar from "../../Components/navbar/Navbar";
import MultipleChoiceQ from "../../Components/QuestionTypes/mcq";
import TrueFalse from "../../Components/QuestionTypes/truefalse";
import ShortAnswer from "../../Components/QuestionTypes/shortans";
import { Typography } from "@mui/material";
export default function Quizzes() {


  let q1= 
    [{
      q_id: 'MultipleChoiceQ',
      question:"What did you guys eat for lunch?",
      options:[
               {option: "apple" , value: "apple"},  
               {option:"banana",value:"banana"},
               {option:"chicken", value: "chicken"},
               {option:"nuggets", value: "nuggets"}
              ],
      answer : "chicken"
     },
     {
      q_id: 'MultipleChoiceQ',
      question:"What did you guys eat for Dinner?",
      options:[
               {option: "Snake", value: "Snake"},  
               {option:"Duck", value: "Duck"},
               {option:"Fish", value: "Fish"}
              ],
      answer : "Fish"
     },
     {
      q_id: 'TrueFalse',
      question:"True or False? I just ate dinner",
      options:[
               {option: "True", value: "True"},  
               {option:"False", value: "False"},

              ],
      answer : "Fish"
     },
     {
      q_id: 'ShortAnswer',
      question:"Discuss your dinner below.",
      options:[],
      answer : "N/A"
     }

    ]
    const mappedQuestions = q1.map((item, index) => {
      if (item.q_id === 'MultipleChoiceQ') {
        return<MultipleChoiceQ data={{item, index}} />
        
      
      } 
      else if (item.q_id === 'TrueFalse'){
        return <TrueFalse data={{item, index}} />;
      }
      
      
      else if (item.q_id === 'ShortAnswer'){
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
