import { Routes, Route } from 'react-router-dom';
import ProfilePage from './ProfilePage';

interface MainRouterProps {
  token: string;
}
// TODO: make a mainrouter component to remove this logic from here, theming should probably be done in Main and not App
const MainRouter = ({ token }: MainRouterProps) => {
  return (
    <Routes>
      <Route path="/profile" element={<ProfilePage token={token} />} />
    </Routes>
  );
};

export default MainRouter;
