import { Box, Button } from "@mui/material";
import MenuBar from "../../components/MenuBar";
import { useApi } from "../../context/ApiProvider";
import { useState } from "react";

const GenImageChallenge = () => {
  const { postData } = useApi();
  const [generatedResult, setGeneratedResult] = useState([]);

  const genResult = async () => {
    try {
      const response = await postData(`api/gemini/generateImage`, {
        prompt: "A glass of lemonade.",
      });
      setGeneratedResult(response.content);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#00141a",
        overflow: "auto",
      }}
    >
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <MenuBar />
      </Box>
      <Button onClick={() => genResult()}>Gen Image</Button>
      {generatedResult && (
        <img src={`data:image/png;base64, ${generatedResult.image}`} />
      )}
    </Box>
  );
};

export default GenImageChallenge;
