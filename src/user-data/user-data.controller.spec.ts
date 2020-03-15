import { Test, TestingModule } from '@nestjs/testing';
import { UserDataController } from './user-data.controller';

describe('UserData Controller', () => {
  let controller: UserDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserDataController],
    }).compile();

    controller = module.get<UserDataController>(UserDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
