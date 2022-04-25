import { ICreateUserDTO } from '../../createUser/ICreateUserDTO';
import { IAuthenticateUserResponseDTO } from '../IAuthenticateUserResponseDTO';

import { InMemoryUsersRepository } from '@modules/users/repositories/in-memory/InMemoryUsersRepository';

import { AuthenticateUserUseCase } from '../AuthenticateUserUseCase';
import { CreateUserUseCase } from '@modules/users/useCases/createUser/CreateUserUseCase';

let authUserUseCase: AuthenticateUserUseCase
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemo: InMemoryUsersRepository;

describe('AuthenticateUserUseCase', (): void => {
  beforeEach(() => {
    usersRepositoryInMemo = new InMemoryUsersRepository()
    authUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemo)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemo)
  })

  it('should be defined', (): void => {
    expect(usersRepositoryInMemo).toBeDefined()
    expect(authUserUseCase).toBeDefined()
    expect(createUserUseCase).toBeDefined()
  })

  it('should be able to authenticate an user', async (): Promise<void> => {
    const user: ICreateUserDTO = {
      name: 'test_user',
      email: 'test_user@gmail.com',
      password: 'test_password'
    }

    await createUserUseCase.execute(user)

    const userAuth: IAuthenticateUserResponseDTO = await authUserUseCase.execute({
      email: user.email,
      password: user.password
    })

    expect(userAuth).toHaveProperty('token')
  })
})