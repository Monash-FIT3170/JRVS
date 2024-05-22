import { Box } from "@mui/material";
import Spline from '@splinetool/react-spline';

export default function BotBox({
    backgroundColor = '#E6EBEF',
    width = '350px',
    height = '400px',
    boxShadow = '0px 4px 4px rgba(0, 0, 0, 0.25)',
    color = 'blue'
}) {
    
    // add new colors to this dictionary so that colours can be easily passed into this component
    const sceneLinks = {
        red: 'https://prod.spline.design/xhKqPV8cj-jyQscz/scene.splinecode',
        purple: 'https://prod.spline.design/aOANidimgpxXndCL/scene.splinecode',
        green: 'https://prod.spline.design/CyFSS0rjnpEG3P2u/scene.splinecode',
        blue: 'https://prod.spline.design/p2v7eOju-kg0Tp9B/scene.splinecode' // Default color
    };

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
                scene={sceneLinks[color]}
            />
        </Box>
    );
}