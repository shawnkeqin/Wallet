import React from "react";
import {ApolloCache, DefaultContext, MutationFunctionOptions} from "@apollo/client";
import {ITransaction, IUpdateTransactionInput} from "./interfaces";
import {ColumnsType} from "antd/lib/table";
import {Space, Tag} from "antd";
import {getDateStringFromTs} from "../../utils";
import Button from "antd/lib/button";

export const columns = (
  updateTransaction: (
    options: MutationFunctionOptions<{
      updateTransaction: ITransaction[]
    },
      IUpdateTransactionInput,
      DefaultContext,
      ApolloCache<ITransaction>>
  ) => Promise<any>
): ColumnsType<ITransaction> => [
  {
    title: 'Bezos-Related',
    dataIndex: 'related',
    render: (value, record) => {
      const color = record.isFollowed ? 'blue' : 'error';
      return (
        <Tag color={color}>{record.isFollowed ? `Bezos-Related` : `Non Bezos-Related`}</Tag>
      );
    }
  },
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    render: (value, record: ITransaction, index: number) => (
      <div key={index}>
        {value.map((category: string, i: number) => <Tag color='success' key={i}>{category.toUpperCase()}</Tag>)}
      </div>
    )
  },
  {
    title: 'Date',
    key: 'date',
    dataIndex: 'date',
  },
  {
    title: 'Merchant Name',
    key: 'merchant_name',
    dataIndex: 'merchant_name'
  },
  {
    title: 'Created At',
    key: 'createdAt',
    dataIndex: 'createdAt',
    render: (value) => (
      <Space size="middle">
        <span>{getDateStringFromTs(+value)}</span>
      </Space>
    ),
  },
  {
    title: 'Updated At',
    key: 'updatedAt',
    dataIndex: 'updatedAt',
    render: (value) => (
      <Space size="middle">
        <span>{getDateStringFromTs(+value)}</span>
      </Space>
    )
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record: ITransaction) => (
      <Button
        onClick={() => updateTransaction({
          variables: {updateInput: {merchant_name: record.merchant_name, isFollowed: !record.isFollowed}}
        })}
      >{record.isFollowed ? `Mark as non Bezos-related` : 'Mark as Bezos-related'}</Button>
    ),
  },
];
