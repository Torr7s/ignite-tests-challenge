import { User } from '@modules/users/entities/User';

import { InMemoryUsersRepository } from '@modules/users/repositories/in-memory/InMemoryUsersRepository';

import { CreateUserUseCase } from '../CreateUserUseCase';

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemo: InMemoryUsersRepository;

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    usersRepositoryInMemo = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemo)
  })

  it('should be defined', async () => {
    expect(usersRepositoryInMemo).toBeDefined()
    expect(createUserUseCase).toBeDefined()
  })

  it('should be able to create a new user', async () => {
    const user: User = await createUserUseCase.execute({
      name: 'test_user',
      email: 'test_user@gmail.com',
      password: 'test_password'
    })

    expect(user).toHaveProperty('id')
  })
})