import { AppBar, Toolbar, Button, Box, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import MultipleChoiceQ from "../../components/QuestionTypes/mcq.jsx";
import TrueFalse from "../../components/QuestionTypes/truefalse.jsx";
import ShortAnswer from "../../components/QuestionTypes/shortans.jsx";
import MenuBar from "../../components/MenuBar.jsx";


import { useApi } from '../../context/ApiProvider.jsx';


function Quizzes() {





    const { getData } = useApi();
    const [quizzes, setQuiz] = useState([]);
    const [isQuizLoading, setIsQuizLoading] = useState(true);
    const quizId = '664195feb8f2d148bfc3ea5c' // would need to get quizzes id from path map node


    const [currentIndex, setCurrentIndex] = useState(0);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseData = await getData('api/quizzes/' + quizId);
                setQuiz(responseData);
                setIsQuizLoading(false);
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

    const handleNextClick = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            console.log(currentIndex)

        }
    };

    
    const renderQuestion = () => {
        if (questions) {
            if (questions[currentIndex].type === 'MultipleChoiceQ') {
                return <MultipleChoiceQ question={questions[currentIndex]} index={currentIndex} />
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

            {/* The idea is to get the Topic name and question and pass through menu bar looks clean*/}
            <MenuBar 
            title='Topic 1: What is AI'
            subtitle='Get ready to learn more about AI today'/>

            <Grid container
                direction="column"
                alignItems="center">


                {renderQuestion()}

            </Grid>

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
                {currentIndex > 0 && (
                    <Button variant="contained" onClick={handlePrevClick} className="button-font"
                        sx={{ ':hover': { backgroundColor: '#2196F3' }, padding: '15px', borderRadius: '15px', backgroundColor: '#FFC93C' }}>
                        Back
                    </Button>
                )}


                {questions && currentIndex === 1?(<Button variant="contained" onClick={handleNextClick} className="button-font"
                    sx={{ ':hover': { backgroundColor: '#2196F3' }, padding: '15px', borderRadius: '15px', backgroundColor: '#FFC93C' }}>
                    Submit
                </Button>) 
                :

                (<Button variant="contained" onClick={handleNextClick} className="button-font"
                    sx={{ ':hover': { backgroundColor: '#2196F3' }, padding: '15px', borderRadius: '15px', backgroundColor: '#FFC93C' }}>
                    Next
                </Button>) 
            }
            </Box>

        </Box>

    );
}

export default Quizzes