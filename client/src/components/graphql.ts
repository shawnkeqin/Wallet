import {gql} from "@apollo/client";

export const TRANSACTIONS_QUERY = gql`
    query GetTransactions {
        transactions{
            id
            amount
            category
            date
            merchant_name
            isFollowed
            createdAt
            updatedAt
        }
    }
`;

export const UPDATE_TRANSACTION_MUTATION = gql`
    mutation updateTransaction($updateInput: UpdateTransactionInput!){
        updateTransaction(updateInput:$updateInput){
            id
            amount
            category
            date
            merchant_name
            isFollowed
            createdAt
            updatedAt
        }
    }
`;