import {

    Button,
    Typography,
    Box,
    Grid
} from '@mui/material';


import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';


export default function Submitted({ score, totalScore }) {


    return (
        <Grid container rowSpacing={2}>
            <Grid item xs={12} display="flex" justifyContent="center">
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
                    display: 'flex',
                    flexDirection: 'column',
                }}>

                    <EmojiEventsOutlinedIcon style={{ fontSize: 150 }} ></EmojiEventsOutlinedIcon>
                    <Typography sx={{ display: "inline", color: '#000000', fontSize: '30px', fontWeight: 600, fontFamily: '"Roboto-Regular", Helvetica', mb: '20px' }}>Congratulations!</Typography>
                    <Typography sx={{ display: "block", color: '#000000', fontSize: '20px', fontWeight: 100, fontFamily: '"Roboto-Regular", Helvetica', lineHeight: '32px', }}>Your Score  </Typography>
                    <Typography sx={{ display: "block", color: '#000000', fontSize: '40px', fontWeight: 700, fontFamily: '"Roboto-Bold", Helvetica', lineHeight: '32px', pb: 3 }}>{score}/{totalScore}</Typography>



                    <div style={{ padding: '10px', backgroundColor: '#FFC700', borderRadius: '20px', color: 'white' }}>
                        <p className='russo-one-regular text-4xl'>&nbsp; +{100} ⭐️&nbsp;</p>
                    </div>


                </Box>



            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center"   >

     
                <Button variant="contained" className="button-font"
                    sx={{ ':hover': { backgroundColor: '#E6B635' }, padding: '14px',mt:'20px', borderRadius: '15px', backgroundColor: '#FFC93C', fontSize: '20px', fontWeight: 700, fontFamily: '"Roboto-Bold", Helvetica' }}>
                    Return to learning path
                </Button>
            </Grid>
        </Grid>
    )
}
