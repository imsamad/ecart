import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';

import OrdersTable from './OrdersTable';
import MyAccount from './MyAccount';

export default function Profile() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        border: 1,
        borderRadius: 2,
        borderColor: 'divider',
      }}
    >
      <Tabs
        centered
        sx={{ borderBottom: 1, borderColor: 'divider' }}
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        variant="fullWidth"
      >
        <Tab label="My Profile" id="0" />
        <Tab label="My Orders" id="1" />
      </Tabs>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <MyAccount />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <OrdersTable />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}

const TabPanel = React.memo(
  (props) => {
    const { children, value, index, dir } = props;

    return (
      <Box hidden={value !== index} dir={dir}>
        {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
      </Box>
    );
  },
  (prev, next) => {
    if (Number(next.value) !== Number(next.index)) return true;
    else return false;
  }
);
