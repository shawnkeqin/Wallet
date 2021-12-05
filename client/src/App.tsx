import React from 'react';
import './App.css';
import { Typography } from 'antd';
import Transactions from "./components/TransactionsComponent/Transactions";

function App() {
  const { Title } = Typography;
  return (
    <div className="App">
      <Title>Bezos's Empire State of Wallet 👛</Title>
<Transactions />
    </div>
  );
}

export default App;
