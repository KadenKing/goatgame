import React from 'react';
import Paper from '@material-ui/core/Paper'
import GoatGame from './components/GoatGame.js'

const pstyle = {
  margin: '3em',
  contentAlign: 'center',
}

function App() {
  return (
    <div>
      <Paper style={pstyle}>
        <GoatGame></GoatGame>
      </Paper>
    </div>
      );
    }
    
    export default App;
