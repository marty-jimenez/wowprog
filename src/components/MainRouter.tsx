import { Routes, Route } from 'react-router-dom';
import ProfileInput from './ProfileInput';
import ProfilePage from './ProfilePage';

interface MainRouterProps {
  token: string;
}

const MainRouter = ({ token }: MainRouterProps) => {
  return (
    <Routes>
      <Route path="/profile" element={<ProfileInput token={token} />} />
      <Route
        path="/profile/:name/:realm"
        element={<ProfilePage token={token} />}
      />
    </Routes>
  );
};

export default MainRouter;
