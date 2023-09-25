import './App.css';

import DesktopLayout from './components/DesktopLayout';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import store from './store';
import theme from './constants/theme';

function App() {
  return (
    <ThemeProvider theme={theme.dark}>
      <Provider store={store}>
        <DesktopLayout />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
