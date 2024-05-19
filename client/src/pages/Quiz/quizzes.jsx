import { Box, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import MultipleChoice from "../../components/quizComponents/MutipleChoice.jsx";
import TrueFalse from "../../components/quizComponents/TrueFalse.jsx";
import ShortAnswer from "../../components/quizComponents/ShortAnswer.jsx";
import Submitted from "../../components/quizComponents/Submitted.jsx";
import MenuBar from "../../components/MenuBar.jsx";
import ActionButton from "../../components/quizComponents/ActionButton.jsx";
import Reorder from "../../components/quizComponents/Reorder.jsx";
import ImageQuiz from "../../components/quizComponents/ImageQuiz.jsx";

import { useApi } from '../../context/ApiProvider.jsx';


function Quizzes() {
    const { getData, postData } = useApi();
    const [quizzes, setQuiz] = useState([]);
    const { quizId }  = useParams();
    const [user, setUser] = useState({});
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
        }
        // get user
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await postData('api/auth/current', {token});
                const userData = await getData(`api/users/id/${res.decoded.id}`);
                console.log(userData);
                setUser(userData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
        fetchUser();
    }, [getData, quizId, postData])

    let questions = quizzes.questions
    
    const handlePrevClick = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
            

        }
    };

    const submitForm = async () => {
        console.log(userValues)
        console.log("Current user data:", user);
        if (!user || !user.username) {
            console.error("No user data available for updating points.");
        }
        let correctCount = 0;
        questions.forEach(question => {

            if (question.type ==='Reorder'){
                if (userValues[question.questionText].toString() === question.answer.toString()) {
                    correctCount += 1;
                }

            }
            else if (userValues[question.questionText] === question.answer) {
                correctCount += 1;
            }
            
        });

        setUserScore(correctCount)
        setTotalScore(questions.length)
        setIsSubmitted(true);
        // update user points
        try {
            const response = await postData('api/users/updatePoints', { username: user.username, newPoints: parseInt(user.points) + 100});
            console.log('Points updated:', response.points);
        } catch (error) {
            console.error('Failed to update points', error);
        }
        

    }

    const handleNextClick = () => {
        const currentQuestion = questions[currentIndex];
        if (userValues[currentQuestion.questionText] !== undefined) {
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
    const setSelections = (questionText, value) => {
        setUserValues(prevUserValues => ({
            ...prevUserValues,
            [questionText]: value
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
            else if (questions[currentIndex].type === 'Reorder') {
                
                return <Reorder question={questions[currentIndex]} index={currentIndex} setSelection={setSelections} userValues={userValues} />
            }
            else if (questions[currentIndex].type === 'ImageQuiz') {
                
                return <ImageQuiz question={questions[currentIndex]} index={currentIndex} setSelection={setSelections} userValues={userValues} />
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
            backgroundColor: '#3CA3EE',
            overflow: 'auto'
        }}
        >
            <MenuBar  />
            <Grid container direction="column" alignItems="center" sx={{backgroundColor: '#3CA3EE'}}>
                <Box> 
                    <Typography sx={{ display: "block", color: 'white', fontSize: '40px', lineHeight: '30px', fontWeight: 700, pl: 6 }}>Quiz</Typography>
                    <Typography sx={{ fontFamily: "sans-serif", display: "inline", color: 'white', fontSize: '30px', fontWeight: 100, pl: 6}}>{quizzes.topic}</Typography>

                    {renderQuestion()}
                </Box>

            </Grid>

            
            <Box sx={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                display: 'flex',
                justifyContent: currentIndex > 0 ? 'space-between' : 'flex-end',
                paddingBottom: '60px',
                paddingLeft: '60px',
                paddingRight: '60px',
             
                
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