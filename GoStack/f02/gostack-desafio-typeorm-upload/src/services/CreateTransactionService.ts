import { getCustomRepository, getRepository } from 'typeorm';
import { response } from 'express';
import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    type,
    value,
    category,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getRepository(Category);

    const balance = await transactionsRepository.getBalance();

    if (type === 'outcome') {
      if (balance.total < value) {
        throw new AppError('Blocked transaction, insufficient balance!');
      }
    }

    let checkCategoryExist = await categoriesRepository.findOne({
      where: { title: category },
    });

    if (!checkCategoryExist) {
      checkCategoryExist = await categoriesRepository.create({
        title: category,
      });
      await categoriesRepository.save(checkCategoryExist);
    }

    const transaction = await transactionsRepository.create({
      title,
      type,
      value,
      category_id: checkCategoryExist.id,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
