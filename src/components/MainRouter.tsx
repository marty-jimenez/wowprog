import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main';

interface MainRouterProps {
  token: string;
  handleDarkModeToggle: () => void;
}

// TODO: make a mainrouter component to remove this logic from here, theming should probably be done in Main and not App
const MainRouter = ({ token, handleDarkModeToggle }: MainRouterProps) => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Main token={token} handleDarkModeToggle={handleDarkModeToggle} />
          }
        />
      </Routes>
    </Router>
  );
};

export default MainRouter;
