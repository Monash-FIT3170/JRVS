import { Button, Box, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import MultipleChoice from "../../components/quizComponents/MutipleChoice.jsx";
import TrueFalse from "../../components/quizComponents/TrueFalse.jsx";
import ShortAnswer from "../../components/quizComponents/ShortAnswer.jsx";
import Submitted from "../../components/quizComponents/Submitted.jsx";
import MenuBar from "../../components/MenuBar.jsx";
import ActionButton from "../../components/quizComponents/ActionButton.jsx";

import { useApi } from '../../context/ApiProvider.jsx';


function Quizzes() {
    const { getData } = useApi();
    const [quizzes, setQuiz] = useState([]);

    const quizId = '664195feb8f2d148bfc3ea5c' // would need to get quizzes id from path map node
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userValues, setUserValues] = useState('');
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
                correctCount += 1;
            }
        });

        setUserScore(correctCount)
        setTotalScore(questions.length)
        setIsSubmitted(true);

    }

    const handleNextClick = () => {


        const currentQuestion = questions[currentIndex];
        if (userValues[currentQuestion.question] !== undefined) {
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
            }
        }
        else{

            //temporary for now, introduce helper text in the future
            alert('Please select an option before proceeding.');
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
            return <Submitted score={userScore} totalScore={totalScore} />; // Render the Submitted component after submission
        }


        else if (questions) {
            if (questions[currentIndex].type === 'MultipleChoice') {
                return <MultipleChoice question={questions[currentIndex]} index={currentIndex} setSelection={setSelections} userValues={userValues} />
            }
            else if (questions[currentIndex].type === 'TrueFalse') {
                return <TrueFalse question={questions[currentIndex]} index={currentIndex} setSelection={setSelections} userValues={userValues} />
            }


            else if (questions[currentIndex].type === 'ShortAnswer') {
                return <ShortAnswer question={questions[currentIndex]} index={currentIndex} setSelection={setSelections} userValues={userValues} />
            }
            else {
                return null;
            }
        }
    }

    return (

        <Box sx={{
            width: '100vw',
            height: '100vh',

        }}
        >
            <MenuBar />
            <Grid container direction="column" alignItems="center">
                <Box>
                    <Typography sx={{ display: "block", color: 'white', fontSize: '40px', lineHeight: '30px', fontWeight: 700, pl: 6 }}>Quiz</Typography>
                    <Typography sx={{ fontFamily: "sans-serif", display: "inline", color: 'white', fontSize: '30px', fontWeight: 100, pl: 6 }}>Do you know what AI is?</Typography>

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
                paddingLeft: '60px',
                paddingRight: '60px'
            }}>
                {isSubmitted === false && currentIndex > 0 && (<ActionButton onClick={handlePrevClick}>Back</ActionButton>)}
                {isSubmitted === false && questions && currentIndex === questions.length - 1 ? (<ActionButton onClick={submitForm}>Submit</ActionButton>)
                    :
                    isSubmitted === false && (<ActionButton onClick={handleNextClick}> Next</ActionButton>)}
            </Box>

        </Box>

    );
}

export default Quizzes