import React from 'react';
import '../../App.css';
import {Card, Col, Row, Table} from 'antd';
import {ApolloCache, DefaultContext, useMutation, useQuery, useSubscription} from "@apollo/client";
import {TRANSACTIONS_QUERY, TRANSACTIONS_SUBSCRIPTION, UPDATE_TRANSACTION_MUTATION} from "./graphql";
import {ITransaction, IUpdateTransactionInput} from "./interfaces";
import ErrorBoundary from "antd/lib/alert/ErrorBoundary";
import {notification} from 'antd';

function Transactions() {
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
        setError(queryError || mutationError);
      }, [queryError, mutationError]);

      const bezosRelatedTransactions = data.filter(item => item.isFollowed);
      const total = data.reduce((prev, curr) => prev + curr.amount, 0);
      const bezosTotal = bezosRelatedTransactions.reduce((prev, curr) => prev + curr.amount, 0);
      return (
        <div className="App">
          <Row>
            <Col>
              <Card>
                Percentage: {Math.round(bezosTotal / total * 10000) / 100}%
              </Card>
            </Col>
            <Col>
              <Card>
                Total: {bezosTotal.toFixed(2)}$
              </Card>
            </Col>
          </Row>
          {error && <ErrorBoundary message='Graphql Error' description='Graphql Error'>
            <div>{JSON.stringify(error)}</div>
          </ErrorBoundary>}
        </div>
      );
  }

export default Transactions; 
  