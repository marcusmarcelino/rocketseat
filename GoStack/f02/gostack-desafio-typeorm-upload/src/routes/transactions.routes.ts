import { Router } from 'express';

import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository);
  const transactions = transactionsRepository.getBalance();
  return response.json(transactions);
});

transactionsRouter.post('/', async (request, response) => {
  return response.json({ ok: 'Criação' });
});

transactionsRouter.delete('/:id', async (request, response) => {
  return response.json({ ok: 'Exclusão' });
});

transactionsRouter.post('/import', async (request, response) => {
  return response.json({ ok: 'Importação' });
});

export default transactionsRouter;
