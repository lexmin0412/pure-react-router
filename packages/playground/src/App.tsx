import './App.css';
import { BrowserRouter, Route } from 'pure-react-router';
import { routes } from './routes';

const App = () => {
  return (
    <BrowserRouter basename='' routes={routes}>
      <Route  />
    </BrowserRouter>
  );
};

export default App;
