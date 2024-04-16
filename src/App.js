import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import products from './products.json'; // Assuming this import is correct and the file exists
import orders from './orders.json'; // Assuming this import is correct and the file exists

function App() {
  const [deliveryDay, setDeliveryDay] = React.useState("");
  const [canShow, setCanShow] = React.useState(false);
  const [resultMap, setResultMap] = React.useState(new Map()); // Use state to store the map

  const handleChangeItem = (event) => {
    setDeliveryDay(event.target.value);
  };

  const handleSubmit = () => {
    let retMap = new Map(); // Initialize the map inside the function

    for (let i = 0; i < orders.length; i++) {
      let currOrder = orders[i];
      if (currOrder.orderDate === deliveryDay) {
        for (let j = 0; j < currOrder.lineItems.length; j++) {
          let currProduct = currOrder.lineItems[j].productName;
          if (!retMap.has(currProduct)) {
            retMap.set(currProduct, 1);
          } else {
            retMap.set(currProduct, retMap.get(currProduct) + 1);
          }
        }
      }
    }

    setResultMap(retMap); // Update the state with the new map

    if (retMap.size > 0) {
      setCanShow(true);
    } else {
      setCanShow(false);
    }
  };

  const Results = () => {
    return (
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: 300,
          '& ul': { padding: 0 },
        }}
      >
        {Array.from(resultMap.entries()).map(([product, count]) => ( // Convert the map entries to an array
          <ListItem key={product}> {/* Add a key to each ListItem */}
            <ListItemText primary={`${product} x ${count}`} /> {/* Display product and count */}
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <div>
      <Box sx={{ m: 10, textAlign: 'center' }}>
        <TextField
          required
          id="find-prev-day"
          label="find previous day"
          helperText="format: year(eg.2024)-month(04)-date(10)"
          onChange={handleChangeItem}
        />
        <Button variant="contained" sx={{ m: 4 }} onClick={handleSubmit}>Submit</Button>
      </Box>
      {canShow? <Results />: <span>Nothing listed on this day</span>} 
    </div>
  );
}

export default App;