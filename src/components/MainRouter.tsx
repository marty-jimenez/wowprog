import { Routes, Route } from 'react-router-dom';
import ProfilePage from './ProfilePage';

interface MainRouterProps {
  token: string;
}

const MainRouter = ({ token }: MainRouterProps) => {
  return (
    <Routes>
      <Route path="/profile" element={<ProfilePage token={token} />} />
    </Routes>
  );
};

export default MainRouter;
