import { Injectable } from '@nestjs/common';
import { CreatePointInput } from './dto/create-point.input';
import { UpdatePointInput } from './dto/update-point.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Point } from './entities/point.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { FirebaseUser } from 'src/authentication/user.decorator';
import { UserRecord } from 'firebase-admin/auth';

@Injectable()
export class PointsService {
  
  constructor(
    @InjectRepository(Point)
    private readonly pointsRepository: Repository<Point>,
  ) {}

  findAll() {
    return this.pointsRepository.find();
  }

  findOne(id: string) {
    //@ts-ignore
    return this.pointsRepository.findOne({ _id: new ObjectId(id) });
  }

  create(
    uid: string,
    userName: string,
    createPointInput: CreatePointInput,
    ): Promise<Point> {
    try{
      const newPoint = new Point();
      newPoint.uid = uid;
      newPoint.userName = userName ?? "";
      newPoint.usablePoints = 0;
      newPoint.totalPoints = 0;
      newPoint.isPublic = createPointInput.isPublic;
      return this.pointsRepository.save(newPoint);
    }catch(error) {
      console.log(error);
    }
  }

  update(id: number, updatePointInput: UpdatePointInput) {
    return `This action updates a #${id} point`;
  }

  remove(id: number) {
    return `This action removes a #${id} point`;
  }

  // for seeding

  async saveAll(points: Point[]): Promise<Point[]> {
    return this.pointsRepository.save(points);
  }

  async truncate(): Promise<void> {
    await this.pointsRepository.clear();
  }
}
