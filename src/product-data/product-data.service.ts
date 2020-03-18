import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './models/category/category.entity';
import { Repository } from 'typeorm';
import { Color } from './models/color/color.entity';
import { Electronic } from './models/electronic/electronic.entity';
import { FoodAndBev } from './models/food-and-bev/food-and-bev.entity';
import { Furniture } from './models/furniture/furniture.entity';
import { Product } from './models/product/product.entity';
import { Tile } from './models/tile/tile.entity';

@Injectable()
export class ProductDataService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Color) private colorRepository: Repository<Color>,
    @InjectRepository(Electronic)
    private electronicRepository: Repository<Electronic>,
    @InjectRepository(FoodAndBev)
    private foodAndBevRepository: Repository<FoodAndBev>,
    @InjectRepository(Furniture)
    private furnitureRepository: Repository<Furniture>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Tile) private tileRepository: Repository<Tile>,
  ) {}

  async selectProductType(label): Promise<Product[]> {
    const query = await this.productRepository.find({
      relations: ['category'],
      where: {
        productId: label,
      },
    });
    // console.log("Salmon",await this.productRepository.createQueryBuilder().getSql())
    // const select = await this.ProductRepository.createQueryBuilder("product").innerJoinAndSelect("product.category","category").where(`product.productId = :label`,{label : label}).getMany()
    return query;
  }

  async selectProductFoodData(label): Promise<any[]> {
    const query = await this.foodAndBevRepository.find({
      where: {
        foodAndBevId: label,
      },
    });
    return query;
  }

  async selectProductFurniture(label): Promise<any[]> {
    const query = await this.furnitureRepository.find({
      relations: ['color'],
      where: {
        furnitureId: label,
      },
    });
    return query;
  }

  async selectProductElectronic(label): Promise<any[]> {
    const query = await this.electronicRepository.find({
      relations: ['color'],
      where: {
        electronicId: label,
      },
    });
    return query;
  }

  async selectProductTileData(label): Promise<any[]> {
    const query = await this.tileRepository.find({
      where: {
        tileId: label,
      },
    });
    return query;
  }

  async selectProductList(): Promise<any[]> {
    const query = await this.productRepository.find({
      relations: ['category'],
    });
    return query;
  }

  async selectOtherProductFoodAndBev(productId): Promise<any[]> {
    const query = await this.foodAndBevRepository
      .createQueryBuilder('foodAndBev')
      .where('foodAndBev.foodAndBevId != :productId ', { productId: productId })
      .getMany();
    return query;
  }

  async selectOtherProductFurniture(productId): Promise<any[]> {
    const query = await this.furnitureRepository
      .createQueryBuilder('furniture')
      .where('furniture.furnitureId != :productId ', { productId: productId })
      .getMany();
    return query;
  }

  async selectOtherProductElectronic(productId): Promise<any[]> {
    const query = await this.electronicRepository
      .createQueryBuilder('electronic')
      .where('electronic.electronicId != :productId ', { productId: productId })
      .getMany();
    return query;
  }

  async selectOtherProductTile(productId): Promise<any[]> {
    const query = await this.tileRepository
      .createQueryBuilder('tile')
      .where('tile.tileId != :productId ', { productId: productId })
      .getMany();
    return query;
  }
}
