import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/signin/', { email, password });
      const { access_token, refresh_token } = response.data;
      if (access_token && refresh_token) {
        Cookies.set('access_token', access_token, { expires: 1 });
        Cookies.set('refresh_token', refresh_token, { expires: 7 }); 
        alert('Sign in successful');
        navigate('/users');
      } else {
        throw new Error('Invalid response from server')
      }
    } catch (error: any) {
      console.error('Sign in failed:', error);
      setError(error.response?.data?.message || 'An error occurred during sign-in.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Sign In Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
       
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default SignInForm;
