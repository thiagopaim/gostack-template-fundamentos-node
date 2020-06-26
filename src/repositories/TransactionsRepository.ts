import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionModel {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    // outcome items
    const outcomePattern = /outcome/;
    const outcomeItems = this.transactions.filter(item =>
      outcomePattern.test(item.type),
    );

    const outcomeItemsFiltered = outcomeItems.map(item =>
      Math.floor(item.value),
    );

    const outcome = outcomeItemsFiltered.reduce((a, b) => a + b, 0);

    // ---------------------------------------------------

    // income items
    const incomePattern = /income/;
    const incomeItems = this.transactions.filter(item =>
      incomePattern.test(item.type),
    );

    const incomeItemsFiltered = incomeItems.map(item => Math.floor(item.value));

    const income = incomeItemsFiltered.reduce((a, b) => a + b, 0);
    // ---------------------------------------------------

    const total = income - outcome;

    return { outcome, income, total };
  }

  public create({ title, type, value }: TransactionModel): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
