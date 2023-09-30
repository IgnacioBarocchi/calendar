import EventCreationModal from './components/EventCreationModal';
import EventDetailsModal from './components/EventDetailsModal';
import GlobalStyle from './GlobalStyle';
import Layout from './components/Layout';
import { RootState } from './store/@types';
import { ThemeProvider } from 'styled-components';
import theme from './constants/theme';
import { useSelector } from 'react-redux';

function App() {
  const selectedTheme = useSelector((state: RootState) => state.selectedTheme);

  return (
    <ThemeProvider theme={theme[selectedTheme]}>
      <GlobalStyle />
      <EventDetailsModal />
      <EventCreationModal />
      <Layout />
    </ThemeProvider>
  );
}

export default App;
