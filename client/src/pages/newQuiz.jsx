import { useState } from "react";
import { useApi } from "../context/ApiProvider";
import { Box, Grid, Typography, Button, FormControlLabel, Radio, MenuItem, Select } from "@mui/material";
import TextField from '@mui/material/TextField';
import StyledBox from "../components/quizComponents/StyledBox";

const NewQuiz = () => {
    const { postData } = useApi();
    const [questions, setQuestions] = useState([]);



    const handleAddQuestion = () => {
        setQuestions([...questions, { questionType: '', questionText: '', choices: [''], selectedRadio: '' }]);
    };

    const handleRemoveQuestion = (index) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };


    const handleQuestionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].questionText = value;
        setQuestions(newQuestions);
    };

    const handleChoiceChange = (qIndex, cIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].choices[cIndex] = value;
        setQuestions(newQuestions);
    };

    const handleAddChoice = (qIndex) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].choices.push('');
        setQuestions(newQuestions);
    };

    const handleRemoveChoice = (qIndex, cIndex) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].choices = newQuestions[qIndex].choices.filter((_, i) => i !== cIndex);
        setQuestions(newQuestions);
    };

    const handleRadioChange = (qIndex, index) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].selectedRadio = index;
        setQuestions(newQuestions);
    };


    const handleQuestionTypeChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].questionType = value;
        setQuestions(newQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const questionData = questions.map((q) => ({
            type: q.questionType,
            questionText: q.questionText,
            options: q.choices.map(choice => ({ option: choice, value: choice })),
            answer: q.choices[q.selectedRadio] || ''
        }));

        const quizData = {
            topic: "Your Topic", // Replace with the actual topic
            questions: questionData,
        };

        try {
            const res = await postData('api/quizzes', quizData);
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{
                width: '100vw',
                height: '100vh',
                backgroundColor: '#3CA3EE',
                overflow: 'auto'
            }}>
                <Grid container direction="column" alignItems="center" sx={{ backgroundColor: '#3CA3EE' }}>
                    {questions.map((q, qIndex) => (
                        <StyledBox >
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Question {qIndex + 1}
                            </Typography>
                            {/*Dropdown for question type */}
                            <Select
                                value={q.questionType}
                                onChange={(e) => handleQuestionTypeChange(qIndex, e.target.value)}
                                displayEmpty
                                sx={{ width: '80%' }}
                            >
                                <MenuItem value="" disabled>Select Question Type</MenuItem>
                                <MenuItem value="MultipleChoice">Multiple Choice</MenuItem>

                            </Select>



                            {/*If Multiplechoice*/}
                            {q.questionType === "MultipleChoice" && (
                                <>
                                    <Typography variant="h6" sx={{ mt: 2 }}>
                                        Question:
                                    </Typography>
                                    <TextField
                                       
                                        placeholder="Enter your question"
                                        variant="outlined"
                                        sx={{ width: '80%', mt: 2 }}
                                        value={q.questionText}
                                        onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                                    />

                                    <Typography variant="h6" sx={{ mt: 1 }}>
                                        Options:
                                    </Typography>
                                     {/*Map out all the choices for that particular question    */}
                                    {q.choices.map((choice, cIndex) => (
                                        <Box key={cIndex} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                            <TextField
                                         
                                                variant="outlined"
                                                sx={{ width: '80%' }}
                                                value={choice}
                                                onChange={(e) => handleChoiceChange(qIndex, cIndex, e.target.value)}
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Radio
                                                        checked={q.selectedRadio === cIndex}
                                                        onChange={() => handleRadioChange(qIndex, cIndex)}
                                                        value={cIndex}
                                                      
                                                        color="primary"
                                                    />
                                                }
                                                label="Correct Answer"
                                                sx={{ ml: 2 }}
                                            />

                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => handleRemoveChoice(qIndex, cIndex)}
                                                sx={{ ml: 2 }}
                                            >
                                                Remove
                                            </Button>
                                        </Box>
                                    ))}

                                    <Button variant="contained" sx={{ mt: 2 }} onClick={() => handleAddChoice(qIndex)}>
                                        Add Option
                                    </Button>
                                </>
                            )}

                            <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={() => handleRemoveQuestion(qIndex)}>
                                Remove Question
                            </Button>
                        </StyledBox>
                    ))}

                    <Button variant="contained" sx={{ mt: 2 }} onClick={handleAddQuestion}>
                        Add Question
                    </Button>

                    <Button variant="contained" sx={{ mt: 2 }} type="submit">
                        Submit
                    </Button>
                </Grid>
            </Box>
        </form>
    );
};

export default NewQuiz;
