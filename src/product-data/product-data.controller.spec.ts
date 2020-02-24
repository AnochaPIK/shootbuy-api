import { Test, TestingModule } from '@nestjs/testing';
import { ProductDataController } from './product-data.controller';

describe('ProductData Controller', () => {
  let controller: ProductDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductDataController],
    }).compile();

    controller = module.get<ProductDataController>(ProductDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
