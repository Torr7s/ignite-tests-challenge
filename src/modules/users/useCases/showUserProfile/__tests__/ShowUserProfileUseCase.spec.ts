import { User } from '@modules/users/entities/User';

import { ICreateUserDTO } from '../../createUser/ICreateUserDTO';
import { IAuthenticateUserResponseDTO } from '../../authenticateUser/IAuthenticateUserResponseDTO';

import { InMemoryUsersRepository } from '@modules/users/repositories/in-memory/InMemoryUsersRepository';

import { AuthenticateUserUseCase } from '../../authenticateUser/AuthenticateUserUseCase';
import { ShowUserProfileUseCase } from '../ShowUserProfileUseCase';
import { CreateUserUseCase } from '@modules/users/useCases/createUser/CreateUserUseCase';

let usersRepositoryInMemo: InMemoryUsersRepository;

let authUserUseCase: AuthenticateUserUseCase
let createUserUseCase: CreateUserUseCase;
let showUserProfileUseCase: ShowUserProfileUseCase;

describe('ShowUserProfileUseCase', () => {
  beforeEach(() => {
    usersRepositoryInMemo = new InMemoryUsersRepository()

    authUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemo)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemo)
    showUserProfileUseCase = new ShowUserProfileUseCase(usersRepositoryInMemo)
  })

  it('should be defined', (): void => {
    expect(usersRepositoryInMemo).toBeDefined()
    expect(authUserUseCase).toBeDefined()
    expect(createUserUseCase).toBeDefined()
    expect(showUserProfileUseCase).toBeDefined()
  })

  it('should be able to show user profile by being authenticated', async (): Promise<void> => {
    const user: User = await createUserUseCase.execute({
      name: 'test_user',
      email: 'test_user@gmail.com',
      password: 'test_password'
    })

    await authUserUseCase.execute({
      email: 'test_user@gmail.com',
      password: 'test_password'
    })

    const userProfile = await showUserProfileUseCase.execute(user.id)

    expect(userProfile).toBeDefined()
    expect(userProfile).toHaveProperty('id')
    expect(userProfile).toHaveProperty('name')
    expect(userProfile).toHaveProperty('email')
  })
})