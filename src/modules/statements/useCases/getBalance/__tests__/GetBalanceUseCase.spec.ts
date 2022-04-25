import { InMemoryStatementsRepository } from '@modules/statements/repositories/in-memory/InMemoryStatementsRepository';
import { InMemoryUsersRepository } from '@modules/users/repositories/in-memory/InMemoryUsersRepository';

import { GetBalanceUseCase } from '@modules/statements/useCases/getBalance/GetBalanceUseCase';
import { AuthenticateUserUseCase } from '@modules/users/useCases/authenticateUser/AuthenticateUserUseCase';
import { CreateUserUseCase } from '@modules/users/useCases/createUser/CreateUserUseCase';

let statementsRepositoryInMemo: InMemoryStatementsRepository
let usersRepositoryInMemo: InMemoryUsersRepository;

let getBalanceUseCase: GetBalanceUseCase;
let authUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('GetBalanceUseCase', (): void => {
  beforeEach(() => {
    statementsRepositoryInMemo = new InMemoryStatementsRepository()
    usersRepositoryInMemo = new InMemoryUsersRepository()
    
    authUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemo)
    getBalanceUseCase = new GetBalanceUseCase(
      statementsRepositoryInMemo,
      usersRepositoryInMemo
    )
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemo)
  })

  it('should be defined', (): void => {
    expect(usersRepositoryInMemo).toBeDefined()
    expect(authUserUseCase).toBeDefined()
    expect(createUserUseCase).toBeDefined()
  })

  it('should be able to show all user deposit and withdrawal statements', async (): Promise<void> => {
    const user = await createUserUseCase.execute({
      name: 'test_user',
      email: 'test_user@gmail.com',
      password: 'test_password'
    })

    await authUserUseCase.execute({
      email: 'test_user@gmail.com',
      password: 'test_password'
    })

    const userStatements = await getBalanceUseCase.execute({ user_id: user.id })

    expect(userStatements).toBeDefined()
    expect(userStatements).toHaveProperty('statement')
    expect(userStatements).toHaveProperty('balance')
  })
})