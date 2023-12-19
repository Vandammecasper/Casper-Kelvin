import { Test, TestingModule } from '@nestjs/testing'
import { PointsService } from './points.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Point } from './entities/point.entity'
import { Repository } from 'typeorm'
import { pointStub } from './stubs/points.stub'

describe('PointsService', () => {
  let service: PointsService
  let mockPointsRepository: Repository<Point>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PointsService,
        {
          provide: getRepositoryToken(Point),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn().mockResolvedValue(pointStub()),
            update: jest.fn(),
            // ... any other methods you need to mock
          },
        },
      ],
    }).compile()

    service = module.get<PointsService>(PointsService)
    mockPointsRepository = module.get<Repository<Point>>(getRepositoryToken(Point))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('subtractPoints', () => {
    it('should call pointsRepository.findOne one time', async () => {
      const findOneSpy = jest.spyOn(mockPointsRepository, 'findOne')
      const uid = 'someUserId'
      await service.subtractPoints(uid, 5)
      expect(findOneSpy).toBeCalledTimes(1)
    })

    it('should throw an error when user not found', async () => {
      const uid = 'someNonExistentUserId'
      jest.spyOn(mockPointsRepository, 'findOne').mockResolvedValueOnce(undefined)
      await expect(service.subtractPoints(uid, 5)).rejects.toThrow('User not found')
    })

    it('should call pointsRepository.update one time', async () => {
      const updateSpy = jest.spyOn(mockPointsRepository, 'update')
      const uid = 'someUserId'
      await service.subtractPoints(uid, 5)
      expect(updateSpy).toBeCalledTimes(1)
    })

    it('should call pointsRepository.update with the correct parameters', async () => {
      const uid = 'someUserId'
      const existingPoints = pointStub()
      jest.spyOn(mockPointsRepository, 'findOne').mockResolvedValueOnce(existingPoints)
      const updateSpy = jest.spyOn(mockPointsRepository, 'update')
      await service.subtractPoints(uid, 5)
      expect(updateSpy).toBeCalledWith({ uid }, { usablePoints: existingPoints.usablePoints - 5 })
    })
  })

  // ... other tests for the service methods
})
