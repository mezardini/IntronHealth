import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import ViewUser from './components/User/ViewUser';
import ViewAllUsers from './components/User/ViewAllUsers';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/user/:username" element={<ViewUser />} />
      <Route path="/users" element={<ViewAllUsers />} />
    </Routes>
  );
};

export default App;
