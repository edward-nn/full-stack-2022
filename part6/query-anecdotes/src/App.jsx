import { NotificationContextProvider } from './components/NotificationContext'
import AppQuery from './AppQuery'

const App = () => {
  return (
    <NotificationContextProvider>
    <AppQuery />
    </NotificationContextProvider>
);
};
export default App

