import './App.css';

import Header from './components/Header';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import store from './store';
import theme from './constants/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Header />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
