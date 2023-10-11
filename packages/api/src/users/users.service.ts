import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Repository } from 'typeorm';
import { Role, User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  
  findAll() {
    return this.usersRepository.find();
  }
  
  findOne(id: string) {
    //@ts-ignore
    return this.usersRepository.findOne({_id: id});
  }

  findOneByUid(uid: string) {
    return this.usersRepository.findOneByOrFail({uid});
  }
  
  async create(uid: string, userName: string, createUserInput: CreateUserInput) {

    // TODO: Check if user already exists

    const user = new User();
    user.uid = uid;
    user.name = userName;
    user.locale = createUserInput.locale ?? 'nl';
    user.role = Role.USER;

    const createdUser = await this.usersRepository.save(user);

    // TODO: Create points for user with id createdUser.id
    // const createdPoints = await this.pointsRepository
    return createdUser;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
