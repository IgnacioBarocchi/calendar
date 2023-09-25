import './App.css';

import Header from './components/Header';
import { ThemeProvider } from 'styled-components';
import theme from './constants/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
    </ThemeProvider>
  );
}

export default App;
