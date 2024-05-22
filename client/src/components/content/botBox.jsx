import { Box } from "@mui/material";
import Spline from '@splinetool/react-spline';

export default function BotBox({
    backgroundColor = '#E6EBEF',
    width = '350px',
    height = '400px',
    boxShadow = '0px 4px 4px rgba(0, 0, 0, 0.25)',
}) {
    return (
        <Box
            borderRadius={5}
            p={5}
            sx={{
                backgroundColor: backgroundColor,
                width: width,
                height: height,
                boxShadow: boxShadow
            }}
        >
            <Spline
                style={{ width: "100%", height: '100%', alignContent: 'center' }}
                scene='https://prod.spline.design/XKEgqYXVlVb78tGc/scene.splinecode'
            />
        </Box>
    );
}