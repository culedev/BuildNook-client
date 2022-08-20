// STYLES
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// HOOKS
import { useState } from "react"
// COMPONENTS
import ProductDescription from './ProductDescription';
import ProductReviews from './productReviews/ProductReviews';

function TabPanel(props) {
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function BasicTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }} >
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }} >
      <Tabs value={value} onChange={handleChange} centered style={{borderBottom: '1px solid #e8e8e8'}}>
        <Tab label="DESCRIPTION" style={{color: "#52489C"}}  />
        <Tab label="REVIEWS" style={{color: "#52489C"}} />
      </Tabs>
    </Box>
      <TabPanel value={value} index={0}>
        <ProductDescription />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProductReviews />
      </TabPanel>
    </Box>
  );
}
