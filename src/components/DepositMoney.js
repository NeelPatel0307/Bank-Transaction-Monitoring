
import React, { useState } from 'react';

import { useParams } from 'react-router-dom';
import './DepositMoney.css'; 
const DepositMoney = () => {
    const [depositAmount, setDepositAmount] = useState('');
    const [withdrawalAmount, setWithdrawalAmount] = useState('');
    const [depositMessage, setDepositMessage] = useState('');
    const [withdrawalMessage, setWithdrawalMessage] = useState('');
    const [balance, setBalance] = useState(null);
    const { userId } = useParams();

 const handleDeposit = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/deposit/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ balance: parseFloat(depositAmount) }),
      });

      const data = await response.json();
      console.log(data);
        console.log(data.newBalance);

      setDepositMessage(data.message || 'Deposit successful. New balance: ' + data.newBalance);
    } catch (error) {
      console.error('Error depositing money:', error);
      setDepositMessage('Internal Server Error');
    }
  };

  const handleWithdrawal = async () => {
    try {
      const response = await fetch(`https://785jz7c2kg.execute-api.us-east-1.amazonaws.com/dev/withdrawal/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, withdrawalAmount: parseFloat(withdrawalAmount) }),
      });

      const data = await response.json();
      setWithdrawalMessage(data.message || 'Withdrawal successful. New balance: ' + data.newBalance);
    } catch (error) {
      console.error('Error withdrawing money:', error);
      setWithdrawalMessage('Internal Server Error');
    }
  };


  const getBalance = async () => {
    try {
      const response = await fetch(`https://785jz7c2kg.execute-api.us-east-1.amazonaws.com/dev/getallbankaccounts/${userId}`);
      const data = await response.json();
      setBalance(data.balance);
    } catch (error) {
      console.error('Error getting balance:', error);
    }
  };


  const handleDepositSubmit = (e) => {
    e.preventDefault();
    handleDeposit();
  };

  const handleWithdrawalSubmit = (e) => {
    e.preventDefault();
    handleWithdrawal();
  };


  const handleRefreshBalance = (e) => {
    e.preventDefault();
    getBalance(); 
  };
  return (
    <div className="transaction-container">
      <h1 className="header">Transaction Monitoring</h1>

      <div className="transaction-section">
        <h2>Deposit Money</h2>
        <form className="form" onSubmit={handleDepositSubmit}>
          <label className="label">
            Deposit Amount:
            <input type="text" className="input" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
          </label>
          <button type="submit" className="button">Deposit</button>
        </form>
        <p className="message">{depositMessage}</p>
      </div>

      {/* <div className="transaction-section">
        <h2>Withdraw Money</h2>
        <form className="form" onSubmit={handleWithdrawalSubmit}>
          <label className="label">
            Withdrawal Amount:
            <input type="text" className="input" value={withdrawalAmount} onChange={(e) => setWithdrawalAmount(e.target.value)} />
          </label>
          <button type="submit" className="button">Withdraw</button>
        </form>
        <p className="message">{withdrawalMessage}</p>
      </div> */}
{/* 
      <div className="balance-section">
        <h2>Balance</h2>
        <p className="balance">{balance !== null ? `Current Balance: $${balance.toFixed(2)}` : 'Loading...'}</p>
        <button onClick={handleRefreshBalance} className="button refresh-button">Refresh Balance</button>
      </div> */}
    </div>
  );
};


export default DepositMoney;
