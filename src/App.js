import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import './App.css';

const FACTORURL = 'https://newton.now.sh/api/v2/factor';
const DERIVATIVEURL = 'https://newton.now.sh/api/v2/derive';
const INTEGRATIONURL = 'https://newton.now.sh/api/v2/integrate';

const requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

function App() {
  const [input, setInput] = useState('');
  const [sanitizedInput, setSanitizedInput] = useState('');
  const [answer, setAnswer] = useState('');
  // const [selectedButton, setSelectedButton] = useState('Factor');

  const sanitizeInput = (fetchInput) => {
    let newInput = '';

    for (let i = 0; i < fetchInput.length; i++) {
      if (fetchInput[i] === ' ') {
        // Do nothing
      } else if (fetchInput[i] === '+') {
        newInput += '%2B';
      } else if (fetchInput[i] === '-') {
        newInput += '%2D';
      } else if (fetchInput[i] === '/') {
        newInput += '%2F';
      } else if (fetchInput[i] === '=') {
        newInput += '%3D';
      } else if (fetchInput[i] === '^') {
        newInput += '%5E';
      } else {
        newInput += fetchInput[i];
      }
    }

    setSanitizedInput(newInput);
    fetching(newInput);
  }

  const fetching = (fetchedInput) => {
    if (fetchedInput === '') {
      console.log('I\'m blank');
      const inputEl = document.getElementById('outlined-basic');
      inputEl.focus();
      inputEl.setSelectionRange(0, 0);
      setInput('');
    } else {     
      fetch(`${FACTORURL}/${fetchedInput}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        result = JSON.parse(result);
        setAnswer(result.result);
      });
    }
  }

  const handleOnchange = (event) => {
    event.preventDefault();
    setInput(event.target.value);
  }

  const handleSubmit = () => {
    if (input !== '') {
      sanitizeInput(input);
    } else {
      console.log('I\'m empty');
    }
  }

  const handleExampleClick = (event) => {
    event.preventDefault();
    setInput(event.target.value);
  }

  const handleFactorClick = (event) => {
    // event.preventDefault();
    // console.log(event.target.value);
    // To Do
  }

  return (
    <div className="App">
      <CssBaseline />
      <AppBar
        position="static"
        sx={{ background: 'black' }}
      >
        <Container maxWidth="md">
          <Typography 
            variant="h3"
            component="h2" 
            sx={{
              fontWeight: 'bold',
              padding: '20px 0',
              fontFamily: 'Poppins'
            }}>Factorboy
          </Typography>
        </Container>
      </AppBar>
      <Container maxWidth="md" sx={{ marginBottom: '300px' }}>

        <Button variant="contained" sx={{ fontWeight: 'bold', background: 'black' }} value="Factor">Factor</Button>
        <Button variant="contained" disabled sx={{ margin: '30px 5px', fontWeight: 'bold'}} value="Derivative">Derivative</Button>
        <Button variant="contained" disabled sx={{ fontWeight: 'bold' }} value="Integral">Integral</Button>

        <Container maxWidth="md"></Container>
        
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField id="outlined-basic" label="Enter Equation to Factor" variant="outlined" onChange={handleOnchange} value={input} sx={{ display: 'flex' }} />
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" onClick={handleSubmit} sx={{ padding: '15px 15px', fontWeight: 'bold', background: 'black' }}>Calculate</Button>
          </Grid>
        </Grid>

        <Typography 
            variant="h6" 
            component="h2" 
            sx={{
              fontWeight: 'bold',
              margin: '25px 0 15px'
            }}>Examples (Click to Try)
        </Typography>

        <Button variant="contained" onClick={handleExampleClick} value="x^2 + 5x + 4" sx={{ padding: '5px 10px', fontWeight: 'bold', textTransform: 'lowercase', background: 'black' }}>x^2 + 5x + 4</Button>
        <Button variant="contained" onClick={handleExampleClick} value="x^2 - 3x - 40" sx={{ margin: '0 5px', padding: '5px 10px', fontWeight: 'bold', textTransform: 'lowercase', background: 'black' }}>x^2 - 3x - 40</Button>
        <Button variant="contained" onClick={handleExampleClick} value="x^2 + 18x + 81" sx={{ padding: '5px 10px', fontWeight: 'bold', textTransform: 'lowercase', background: 'black' }}>x^2 + 18x + 81</Button>

        {
          answer ?
            (
              <React.Fragment>
                <Typography 
                    variant="h6" 
                    component="h2" 
                    sx={{
                      fontWeight: 'bold',
                      margin: '30px 0 0',
                    }}>Answer
                </Typography>
                <Typography 
                    variant="h6" 
                    component="h2" 
                    sx={{
                      fontWeight: 'bold',
                    }}>{answer === 'nil' ? 'Equation isn\'t valid. Please try another.' : answer }
                </Typography>
              </React.Fragment>
            ) : ''
        }

      </Container>
      <Typography 
            variant="h6" 
            component="h2" 
            sx={{
              fontWeight: 'bold',
              margin: '50px 0',
              textAlign: 'center',
            }}><Link href="https://awllms.com" target="_blank" rel="noopener" underline="none" color="#d3d3d3" sx={{ fontSize: '1rem', '&:hover': {color: '#0080de'} }}>&copy; 2022 awllms</Link>
      </Typography>
    </div>
  );
}

export default App;
