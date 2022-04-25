import { InMemoryStatementsRepository } from '../../../repositories/in-memory/InMemoryStatementsRepository';
import { InMemoryUsersRepository } from '@modules/users/repositories/in-memory/InMemoryUsersRepository';

import { CreateStatementUseCase } from '../../createStatement/CreateStatementUseCase';
import { GetStatementOperationUseCase } from '../GetStatementOperationUseCase';

import { AuthenticateUserUseCase } from '@modules/users/useCases/authenticateUser/AuthenticateUserUseCase';
import { CreateUserUseCase } from '@modules/users/useCases/createUser/CreateUserUseCase';

let statementsRepositoryInMemo: InMemoryStatementsRepository;
let usersRepositoryInMemo: InMemoryUsersRepository;

let authUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let createStatementUseCase: CreateStatementUseCase;
let getStatementOperationUseCase: GetStatementOperationUseCase;

  enum OperationType {
    DEPOSIT = 'deposit',
    WITHDRAW = 'withdraw',
  }

describe('GetStatementOperationUseCase', () => {
  beforeEach(() => {
    statementsRepositoryInMemo = new InMemoryStatementsRepository()
    usersRepositoryInMemo = new InMemoryUsersRepository()

    authUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemo)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemo)
    createStatementUseCase = new CreateStatementUseCase(
      usersRepositoryInMemo,
      statementsRepositoryInMemo
    )
    getStatementOperationUseCase = new GetStatementOperationUseCase(
      usersRepositoryInMemo,
      statementsRepositoryInMemo
    )
  })

  it('should be defined', () => {
    expect(statementsRepositoryInMemo).toBeDefined()
    expect(usersRepositoryInMemo).toBeDefined()
    expect(createStatementUseCase).toBeDefined()
    expect(authUserUseCase).toBeDefined()
    expect(createUserUseCase).toBeDefined()
  })

  it('should be abe to list a statement informations', async () => {
    const user = await createUserUseCase.execute({
      name: 'test_user',
      email: 'test_user@gmail.com',
      password: 'test_password'
    })

    await authUserUseCase.execute({
      email: 'test_user@gmail.com',
      password: 'test_password'
    })

    const deposit = await createStatementUseCase.execute({
      user_id: user.id,
      type: OperationType.DEPOSIT,
      description: 'Test deposit statement',
      amount: 10
    })

    const statementData = await getStatementOperationUseCase.execute({
      user_id: user.id,
      statement_id: deposit.id
    })

    expect(statementData).toHaveProperty('id')
    expect(statementData).toHaveProperty('user_id')
    expect(statementData).toHaveProperty('type')
    expect(statementData).toHaveProperty('amount')
    expect(statementData).toHaveProperty('description')
  })
})