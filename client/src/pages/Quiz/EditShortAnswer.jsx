import { AppBar, Box, Button, TextField, Toolbar } from "@mui/material";
import MenuBar from "../../components/MenuBar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApi } from "../../context/ApiProvider";

const EditShortAnswerQuestion = () => {
  const navigate = useNavigate();
  const { getData, updateData, updateDataPATCH} = useApi();
  const [questionData, setQuestionData] = useState({ questionText: "", answer: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { quizId, questionId } = useParams(); // Assuming both quizId and questionId are passed as params

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quiz = await getData('api/quizzes/' + quizId);
        const question = quiz.questions.find(q => q._id === questionId);
        if (question) {
          setQuestionData({ questionText: question.questionText, answer: question.answer });
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getData, quizId, questionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!questionData.questionText || !questionData.answer) {
      setError('Please provide both a question and an answer.');
      return;
    }

    try {
      await updateDataPATCH(`api/quizzes/${quizId}/questions/${questionId}`, {
        questionText: questionData.questionText,
        answer: questionData.answer,
      });
      console.log("Works")
    } catch (error) {
      console.error('Failed to update the question:', error);
      setError('Failed to update question. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    setQuestionData({
      ...questionData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '100vw',
        backgroundColor: '#3CA3EE',
      }}
    >
      <Box sx={{ padding: '10px' }}>
        <MenuBar />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'white',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        {!isLoading &&
          <Box sx={{ width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'auto' }}>
            <Box sx={{ borderRadius: '5px', borderWidth: '2px', borderColor: 'black', width: '50%', padding: '20px', marginBottom: '20px', marginTop: '20px' }}>
              <Box sx={{ marginBottom: '40px' }}><h2 className="heading-font">Edit Question</h2></Box>
              <TextField
                required
                variant="outlined"
                label="Question Text"
                name="questionText"
                value={questionData.questionText}
                onChange={handleInputChange}
                multiline
                minRows={4} // Minimum number of visible rows
                sx={{ width: '100%', marginBottom: '20px' }}
              />

              <TextField
                required
                variant="outlined"
                label="Answer"
                name="answer"
                value={questionData.answer}
                onChange={handleInputChange}
                sx={{ width: '100%' }}
              />
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </Box>
          </Box>
        }
      </Box>

      <AppBar position="fixed" elevation={0} sx={{ top: 'auto', bottom: 0, bgcolor: 'transparent', height: '100px', justifyContent: 'center' }}>
        <Toolbar>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Button onClick={handleBackClick} variant="contained" className="button-font" sx={{ ':hover': { backgroundColor: '#2196F3' }, marginLeft: '20px', padding: '15px', borderRadius: '15px', backgroundColor: '#FFC93C' }}>Back</Button>
            <Button onClick={handleSubmit} variant="contained" className="button-font" sx={{ ':hover': { backgroundColor: '#2196F3' }, marginRight: '20px', padding: '15px', borderRadius: '15px', backgroundColor: '#FFC93C' }}>Save</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default EditShortAnswerQuestion;