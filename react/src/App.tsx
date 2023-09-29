import EventCreationModal from './components/EventCreationModal';
import EventDetailsModal from './components/EventDetailsModal';
import GlobalStyle from './GlobalStyle';
import Layout from './components/Layout';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import store from './store';
import theme from './constants/theme';

function App() {
  return (
    <ThemeProvider theme={theme.dark}>
      <GlobalStyle />
      <Provider store={store}>
        <EventDetailsModal />
        <EventCreationModal />
        <Layout />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
