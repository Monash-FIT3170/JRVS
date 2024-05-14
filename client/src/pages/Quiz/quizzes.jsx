import { Button, Box, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import MultipleChoiceQ from "../../components/QuestionTypes/mcq.jsx";
import TrueFalse from "../../components/QuestionTypes/truefalse.jsx";
import ShortAnswer from "../../components/QuestionTypes/shortans.jsx";
import MenuBar from "../../components/MenuBar.jsx";
import Submitted from "../../components/QuestionTypes/submitted.jsx";

import { useApi } from '../../context/ApiProvider.jsx';


function Quizzes() {





    const { getData } = useApi();
    const [quizzes, setQuiz] = useState([]);

    const quizId = '664195feb8f2d148bfc3ea5c' // would need to get quizzes id from path map node
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userValues, setUserValues] = useState ('');



    const [isSubmitted, setIsSubmitted] = useState(false); 
    const [userScore, setUserScore] = useState(0)
    const [totalScore, setTotalScore] = useState(0)
 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseData = await getData('api/quizzes/' + quizId);
                setQuiz(responseData);

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [getData])

    let questions = quizzes.questions
    



    const handlePrevClick = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
            console.log(currentIndex)

        }
    };

    const submitForm = () => {
        let correctCount = 0;
        questions.forEach(question => {
            if (userValues[question.question] === question.answer) {
                correctCount+=1;
            }
        });
     
        setUserScore(correctCount)
        setTotalScore(questions.length)
        
        setIsSubmitted(true);
        
    }

    const handleNextClick = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        

        }
    };


    //should fix to use a proper id rather than take in the question
    const setSelections = (id, value) => {
        setUserValues(prevUserValues => ({
            ...prevUserValues,
            [id]: value
        }));
       
    };
    
    const renderQuestion = () => {

        if (isSubmitted) {
            return <Submitted score={userScore} totalScore = {totalScore}/>; // Render the Submitted component after submission
        }

        
        else if (questions) {
            if (questions[currentIndex].type === 'MultipleChoiceQ') {
                return <MultipleChoiceQ question={questions[currentIndex]} index={currentIndex} setSelection={setSelections} userValues={userValues} />
            }
            else if (questions[currentIndex].type === 'TrueFalse') {
                return <TrueFalse question={questions[currentIndex]} index={currentIndex} />
            }


            else if (questions[currentIndex].type === 'ShortAnswer') {
                return <ShortAnswer question={questions[currentIndex]} index={currentIndex} />
            }
            else {
                return null;
            }
        }
    }



    return (

        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                backgroundColor: '#3CA3EE',
            }}
        >

     
            <MenuBar />



            
            <Grid container
                direction="column"
                alignItems="center">

                    <Box>
                    <Typography sx={{ display: "block", color: 'white', fontSize: '40px', lineHeight: '30px', fontWeight: 700, pl: 6}}>Quiz</Typography>
                    <Typography sx={{fontFamily: "sans-serif", display: "inline", color: 'white', fontSize: '30px', fontWeight: 100, pl: 6}}>Do you know what AI is?</Typography>

                {renderQuestion()}
                </Box>

            </Grid>












{/*THE BUTTONS FIX to be neater instead of harcoding them */}
            <Box sx={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                display: 'flex',
                justifyContent: currentIndex > 0 ? 'space-between' : 'flex-end',
                paddingBottom: '60px',
                paddingLeft:'60px',
                paddingRight: '60px'
            }}>
                {isSubmitted== false && currentIndex > 0 &&  (
                    <Button variant="contained" onClick={handlePrevClick} className="button-font"
                        sx={{ ':hover': { backgroundColor: '#E6B635' }, padding: '15px', borderRadius: '15px', backgroundColor: '#FFC93C' }}>
                        Back
                    </Button>
                )}


                {isSubmitted == false && questions && currentIndex === 1?(<Button variant="contained" onClick={submitForm} className="button-font"
                    sx={{ ':hover': { backgroundColor: '#E6B635' }, padding: '15px', borderRadius: '15px', backgroundColor: '#FFC93C' }}>
                    Submit
                </Button>) 
                :

                isSubmitted == false && (<Button variant="contained" onClick={handleNextClick} className="button-font"
                    sx={{ ':hover': { backgroundColor: '#E6B635' }, padding: '15px', borderRadius: '15px', backgroundColor: '#FFC93C' }}>
                    Next
                </Button>) 
            }
            </Box>

        </Box>

    );
}

export default Quizzes