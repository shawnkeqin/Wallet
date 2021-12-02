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