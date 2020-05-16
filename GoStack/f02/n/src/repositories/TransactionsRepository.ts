import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface TransactionsWithCalculatedBalance {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public allTransactionsWithCalculatedBalance(): TransactionsWithCalculatedBalance {
    const transactionsObject = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };

    return transactionsObject;
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((acc, el, index, array) => {
      if (el.type === 'income') {
        return acc + el.value;
      }
      return acc;
    }, 0);

    const outcome = this.transactions.reduce((acc, el, index, array) => {
      if (el.type === 'outcome') {
        return acc + el.value;
      }
      return acc;
    }, 0);

    const total = income - outcome;

    const balance = { income, outcome, total };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    if (type === 'outcome') {
      const balance = this.getBalance();

      if (balance.total < value) {
        throw Error('Blocked transaction, insufficient balance!');
      }
    }

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
