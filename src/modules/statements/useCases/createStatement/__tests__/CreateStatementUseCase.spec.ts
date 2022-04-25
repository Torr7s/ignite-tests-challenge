import { InMemoryStatementsRepository } from '../../../repositories/in-memory/InMemoryStatementsRepository';
import { InMemoryUsersRepository } from '@modules/users/repositories/in-memory/InMemoryUsersRepository';

import { CreateStatementUseCase } from '../CreateStatementUseCase';

import { AuthenticateUserUseCase } from '@modules/users/useCases/authenticateUser/AuthenticateUserUseCase';
import { CreateUserUseCase } from '@modules/users/useCases/createUser/CreateUserUseCase';

let statementsRepositoryInMemo: InMemoryStatementsRepository;
let usersRepositoryInMemo: InMemoryUsersRepository;

let createStatementUseCase: CreateStatementUseCase;
let authUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

describe('CreateStatementUseCase', () => {
  beforeEach(() => {
    statementsRepositoryInMemo = new InMemoryStatementsRepository()
    usersRepositoryInMemo = new InMemoryUsersRepository()

    createStatementUseCase = new CreateStatementUseCase(
      usersRepositoryInMemo,
      statementsRepositoryInMemo
    )
    authUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemo)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemo)
  })

  it('should be defined', () => {
    expect(statementsRepositoryInMemo).toBeDefined()
    expect(usersRepositoryInMemo).toBeDefined()
    expect(createStatementUseCase).toBeDefined()
    expect(authUserUseCase).toBeDefined()
    expect(createUserUseCase).toBeDefined()
  })

  it('should be able to create a new deposit statement', async () => {
    const user = await createUserUseCase.execute({
      name: 'test_user',
      email: 'test_user@gmail.com',
      password: 'test_password'
    })

    await authUserUseCase.execute({
      email: 'test_user@gmail.com',
      password: 'test_password'
    })

    const userDepositStatement = await createStatementUseCase.execute({
      user_id: user.id,
      type: OperationType.DEPOSIT,
      description: 'Test deposit statement',
      amount: 10
    })

    expect(userDepositStatement).toHaveProperty('id')
    expect(userDepositStatement).toHaveProperty('user_id')
    expect(userDepositStatement).toHaveProperty('type')
    expect(userDepositStatement).toHaveProperty('description')
    expect(userDepositStatement).toHaveProperty('amount')
  })

  it('should be able to create a new withdraw statement', async () => {
    const user = await createUserUseCase.execute({
      name: 'test_user',
      email: 'test_user@gmail.com',
      password: 'test_password'
    })

    await authUserUseCase.execute({
      email: 'test_user@gmail.com',
      password: 'test_password'
    })

    await createStatementUseCase.execute({
      user_id: user.id,
      type: OperationType.DEPOSIT,
      description: 'Test deposit statement',
      amount: 10
    })

    const userWithdrawStatement = await createStatementUseCase.execute({
      user_id: user.id,
      type: OperationType.WITHDRAW,
      description: 'Test withdraw statement',
      amount: 10
    })

    expect(userWithdrawStatement).toHaveProperty('id')
    expect(userWithdrawStatement).toHaveProperty('user_id')
    expect(userWithdrawStatement).toHaveProperty('type')
    expect(userWithdrawStatement).toHaveProperty('description')
    expect(userWithdrawStatement).toHaveProperty('amount')
  })
})