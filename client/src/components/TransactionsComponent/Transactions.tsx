import React from 'react';
import '../../App.css';
import {Card, Col, Row, Table} from 'antd';
import {ApolloCache, DefaultContext, useMutation, useQuery, useSubscription} from "@apollo/client";
import {TRANSACTIONS_QUERY, TRANSACTIONS_SUBSCRIPTION, UPDATE_TRANSACTION_MUTATION} from "./graphql";
import {ITransaction, IUpdateTransactionInput} from "./interfaces";
import {columns} from "./columns";
import Loading from "../LoadingComponent/Loading";
import { Typography } from 'antd';
import ErrorBoundary from "antd/lib/alert/ErrorBoundary";
import {notification} from 'antd';

const spacing = {
    display: 'inline-block',
    margin: '10px'
}

const tableStyle = {
    margin:'20px'
}

function Transactions() {
    const { Title } = Typography;
    const {
        loading: queryLoading,
        error: queryError,
        data: queryData
      } = useQuery<{ transactions: ITransaction[] }>(TRANSACTIONS_QUERY);
      const [updateTransaction, {
        data: mutationData,
        loading: mutationLoading,
        error: mutationError
      }] = useMutation<{ updateTransaction: ITransaction[] },
        IUpdateTransactionInput,
        DefaultContext,
        ApolloCache<ITransaction>>(UPDATE_TRANSACTION_MUTATION);
      const {data: subscriptionData} = useSubscription<{ transactionsAdded: ITransaction[] }>(TRANSACTIONS_SUBSCRIPTION);
    
      const [data, setData] = React.useState<ITransaction[]>([]);
      const [isLoading, setIsLoading] = React.useState<boolean>(false);
      const [error, setError] = React.useState<any>();
    
      React.useEffect(() => {
        if (mutationData) {
          setData(mutationData.updateTransaction);
        }
      }, [mutationData]);
      React.useEffect(() => {
        if (queryData) {
          setData(queryData.transactions);
        }
      }, [queryData]);
      React.useEffect(() => {
        if (subscriptionData?.transactionsAdded?.length) {
          notification.info({
            message: 'New Transactions data added',
            description:
              `${
                subscriptionData.transactionsAdded.length
              } transactions newly added. Transaction ids: ${
                subscriptionData.transactionsAdded.map(item => item.id)
              }`,
            duration: null,
          });
          setData(data => data.concat(...subscriptionData.transactionsAdded).sort((a, b) => a.id - b.id));
        }
      }, [subscriptionData]);
    
      React.useEffect(() => {
        setIsLoading(queryLoading || mutationLoading);
      }, [queryLoading, mutationLoading]);
      React.useEffect(() => {
        setError(queryError || mutationError);
      }, [queryError, mutationError]);

      if (!data.length && isLoading) {
        return <Loading/>;
      }
      const bezosRelatedTransactions = data.filter(item => item.isFollowed);
      const total = data.reduce((prev, curr) => prev + curr.amount, 0);
      const bezosTotal = bezosRelatedTransactions.reduce((prev, curr) => prev + curr.amount, 0);
      return (
        <div className="App">
        <div>
        <div style={spacing}>
              <Card size="small">
              Percentage Spent (On Bezos-related Companies): 
              <Title level={3}>
            {Math.round(bezosTotal / total * 10000) / 100}%
                </Title>
              </Card>
              </div>
              
              <div style={spacing}>
              <Card size="small">
              Amount Spent (On Bezos-related Companies): 
              <Title level={3}>
                Total: ${bezosTotal.toFixed(2)}
                </Title>
              </Card>
              </div>
            </div>
      
          {error && <ErrorBoundary message='Graphql Error' description='Graphql Error'>
            <div>{JSON.stringify(error)}</div>
          </ErrorBoundary>}
          <div style={tableStyle}> 
          <Table
        columns={columns(updateTransaction)}
        dataSource={data.map((item, index) => ({...item, key: index}))}
      />
      </div>
        {isLoading && <Loading/>}
        </div>
      );
  }

export default Transactions; 
  