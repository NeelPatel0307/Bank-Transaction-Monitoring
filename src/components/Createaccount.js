import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Createaccount.css'; // Import your CSS file
const Createaccount = () => {
  const [createUsername, setCreateUsername] = useState('');
  const [createEmail, setCreateEmail] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [createMessage, setCreateMessage] = useState('');
  const [signInMessage, setSignInMessage] = useState('');
  const navigate = useNavigate();

  const createAccount = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/bank`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: createUsername, email: createEmail, password: createPassword }),
      });

      const data = await response.json();
      setCreateMessage(data.message || 'Account created successfully.'); // Handle the response from the Lambda function
    } catch (error) {
      console.error('Error creating account:', error);
      setCreateMessage('Internal Server Error');
    }
  };

  const signIn = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/authenticate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: signInEmail, password: signInPassword }),
      });

      const data = await response.json();
      console.log(data.userId);
      if(data.message){
navigate(`/operation/${data.userId}`);
      }
      setSignInMessage(data.message || 'Sign in successful.'); // Handle the response from the Lambda function
    } catch (error) {
      console.error('Error signing in:', error);
      setSignInMessage('Invalid credentials');
    }
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    createAccount();
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    signIn();
  };

  return (
    <div>
      <h1>Bank Transaction Monitoring</h1>

      {/* Create Account Form */}
      <form onSubmit={handleCreateSubmit}>
        <label>
          Create Username:
          <input type="text" value={createUsername} onChange={(e) => setCreateUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Create Email:
          <input type="text" value={createEmail} onChange={(e) => setCreateEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Create Password:
          <input type="password" value={createPassword} onChange={(e) => setCreatePassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Create Account</button>
      </form>
      <p>{createMessage}</p>

      {/* Sign In Form */}
      <form onSubmit={handleSignInSubmit}>
        <label>
          Sign In Email:
          <input type="text" value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Sign In Password:
          <input type="password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Sign In</button>
      </form>
      <p>{signInMessage}</p>
    </div>
  );
};

export default Createaccount;
