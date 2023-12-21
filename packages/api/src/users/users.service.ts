import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Repository } from 'typeorm';
import { Role, User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PointsService } from 'src/points/points.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly pointsService: PointsService,
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
  
  async create(uid: string, userName: string,  createUserInput: CreateUserInput) {

    const user = new User();
    user.userName = userName;
    user.uid = uid;
    user.locale = createUserInput.locale ?? 'nl';
    user.role = Role.USER;

    const createdUser = await this.usersRepository.save(user);

    if(!createdUser)
      throw new Error('User not created');
    
    const createdPoints = await this.pointsService.create(uid, userName, createUserInput);
    
    if(!createdPoints)
      throw new Error('Points not created');

    return createdUser;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    //@ts-ignore
    const user = await this.usersRepository.findOne({_id: new ObjectId(id)});
    if(!user)
      throw new Error('User not found');

    user.userName = updateUserInput.userName ?? user.userName;

    user.locale = updateUserInput.locale ?? user.locale;

    const points = await this.pointsService.findOneByUid(user.uid);
    if(!points)
      throw new Error('Points not found');

    points.isPublic = updateUserInput.isPublic ?? points.isPublic;

    await this.pointsService.update(points.id, points);

    return this.usersRepository.update(new ObjectId(id), {locale: user.locale});
  }

  updateRole(id: string, role: Role) {
    return this.usersRepository.update(new ObjectId(id), {role});
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async saveAll(users: User[]): Promise<User[]> {
    return this.usersRepository.save(users);
  }

  async truncate(): Promise<void> {
    return this.usersRepository.clear();
  }
}
