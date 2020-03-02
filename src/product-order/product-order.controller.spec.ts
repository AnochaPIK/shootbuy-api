import { Test, TestingModule } from '@nestjs/testing';
import { ProductOrderController } from './product-order.controller';

describe('ProductOrder Controller', () => {
  let controller: ProductOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductOrderController],
    }).compile();

    controller = module.get<ProductOrderController>(ProductOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
