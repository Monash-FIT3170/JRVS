import {
    Button,
    Typography,
    Box,
    Grid
} from '@mui/material';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import BotBox from "../../components/content/botBox";

export default function Submitted({ score, totalScore, points}) {
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 8000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Grid container rowSpacing={2}>
            <Grid item xs={12} display="flex" justifyContent="center">
                {showConfetti && <Confetti />}
                <Box sx={{
                    border: 0,
                    boxShadow: 2,
                    borderRadius: '40px',
                    bgcolor: 'white',
                    borderColor: 'black',
                    color: 'black',
                    minHeight: '200px',
                    minWidth: '512px',
                    maxWidth: '512px',
                    alignItems: 'center',
                    pt: 2,
                    pb: 4,
                    mt: 5,
                    display: 'flex',
                    flexDirection: 'column',
                }}>

                    <BotBox></BotBox>
                    <Typography sx={{ display: "inline", color: '#000000', fontSize: '30px', fontWeight: 600, fontFamily: '"Roboto-Regular", Helvetica', mb: '20px', mt: '12px' }}>Congratulations!</Typography>
                    <Typography sx={{ display: "block", color: '#000000', fontSize: '20px', fontWeight: 100, fontFamily: '"Roboto-Regular", Helvetica', lineHeight: '32px', }}>Your Score  </Typography>
                    <Typography sx={{ display: "block", color: '#000000', fontSize: '40px', fontWeight: 700, fontFamily: '"Roboto-Bold", Helvetica', lineHeight: '32px', pb: 3 }}>{score}/{totalScore}</Typography>

                    <div style={{ padding: '10px', backgroundColor: '#FFC700', borderRadius: '20px', color: 'white' }}>
                        <p className='russo-one-regular text-4xl'>&nbsp; +{points} ⭐️&nbsp;</p>
                    </div>
                </Box>

            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
                <Button href='/learningPath' variant="contained" className="button-font"
                    sx={{ ':hover': { backgroundColor: '#E6B635' }, padding: '14px', mt: '20px',mb:'20px', borderRadius: '15px', backgroundColor: '#FFC93C', fontSize: '20px', fontWeight: 700, fontFamily: '"Roboto-Bold", Helvetica' }}>
                    Return to learning path
                </Button>
            </Grid>
        </Grid>
    )
}
