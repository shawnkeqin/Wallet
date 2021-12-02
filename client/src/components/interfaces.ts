export interface ITransaction {
    id: number;
    amount: number;
    category: string[];
    date: string;
    merchant_name: string;
    isFollowed: boolean;
    createdAt: string;
    updatedAt: string;
  }

  export interface IUpdateTransactionInput {
    updateInput: {
      merchant_name: string;
      isFollowed: boolean;
    }
  }