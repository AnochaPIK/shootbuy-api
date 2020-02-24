import { Furniture } from './furniture.entity';

describe('Furniture', () => {
  it('should be defined', () => {
    expect(new Furniture()).toBeDefined();
  });
});
