import { Injectable } from '@nestjs/common';
import { CreatePointInput } from './dto/create-point.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Point } from './entities/point.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class PointsService {
  
  constructor(
    @InjectRepository(Point)
    private readonly pointsRepository: Repository<Point>,
  ) {}

  findAll(isSort: boolean) {
    return this.pointsRepository.find({ order: isSort ? { totalPoints: "DESC" } : {}});
  }

  findAllPublic(isSort: boolean) {
    return this.pointsRepository.find({ order: isSort ? { totalPoints: "DESC" } : {}, where: { isPublic: true }});
  }

  findOne(id: string) {
    //@ts-ignore
    return this.pointsRepository.findOne({ _id: new ObjectId(id) });
  }

  findOneByUid(uid: string) {
    return this.pointsRepository.findOne({ where: { uid } });
  }

  async getRank(uid: string) {
    const myPoint = await this.pointsRepository.findOne({ where: { uid } });
    if(!myPoint) return 0;

    const allPoints = await this.pointsRepository.find({ order: { totalPoints: "DESC" } });
    if (!allPoints) return 0;

    const myRank = allPoints.findIndex(point => point.uid === uid);

    //@ts-ignore
    return myRank + 1;
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

  async addPoints(uid: string, points: number) {
    //@ts-ignore
    const existingPoints = await this.pointsRepository.findOne({where:{uid}});

    if (!existingPoints) {
      throw new Error('User not found'); 
    }
    
    return this.pointsRepository.update({ uid }, { totalPoints: existingPoints.totalPoints+points, usablePoints: existingPoints.usablePoints+points });
  }

  async subtractPoints(uid: string, points: number) {
    //@ts-ignore
    const existingPoints = await this.pointsRepository.findOne({where:{uid}});

    if (!existingPoints) {
      throw new Error('User not found'); 
    }
    
    return this.pointsRepository.update({ uid }, { usablePoints: existingPoints.usablePoints-points });
  }

  update(id: string, updatePointInput: Point) {
    return this.pointsRepository.update(new ObjectId(id), updatePointInput);
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
