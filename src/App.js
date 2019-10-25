import React, { Component } from 'react';
import ButtonAppBar from './components/Navbar';
import HomePage from './pages/homepage/homepage';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme/theme';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 0px;
  flex-direction: column;
`;

class App extends Component {
  render() {
    return (
      <div id="app">
        <Wrapper>
          <MuiThemeProvider theme={theme}>
            <ButtonAppBar/>
            <HomePage/>
          </MuiThemeProvider>
        </Wrapper>
      </div>
    );
  }
}

export default App;
