import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Shop" {...a11yProps(0)} />
          <Tab label="Avatars" {...a11yProps(1)} />
          <Tab label="Accessories" {...a11yProps(2)} />
          <Tab label="Backgrounds" {...a11yProps(3)} />
          <Tab label="Borders" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Shop goes here
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        avatars go here
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        accessories go here
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        backgrounds go here
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        borders go here
      </CustomTabPanel>
    </Box>
  );
}