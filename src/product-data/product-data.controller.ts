import { Controller, Get, Param } from '@nestjs/common';
import { ProductDataService } from './product-data.service';

@Controller('product-data')
export class ProductDataController {
  constructor(private productDataService: ProductDataService) {}

  @Get('selectProductType/:label')
  selectProductType(@Param() params): Promise<any[]> {
    return this.productDataService.selectProductType(params.label);
  }

  @Get('selectProductFoodData/:label')
  selectProductFoodData(@Param() params): Promise<any[]> {
    return this.productDataService.selectProductFoodData(params.label);
  }

  @Get('selectProductFurnitureData/:label')
  selectProductFurniture(@Param() params): Promise<any[]> {
    return this.productDataService.selectProductFurniture(params.label);
  }

  @Get('selectProductElectronicData/:label')
  selectProductElectronic(@Param() params): Promise<any[]> {
    return this.productDataService.selectProductElectronic(params.label);
  }

  @Get('selectProductTileData/:label')
  selectProductTileData(@Param() params): Promise<any[]> {
    return this.productDataService.selectProductTileData(params.label);
  }

  @Get('selectProductList')
  selectProductList(): Promise<any[]> {
    return this.productDataService.selectProductList();
  }

  @Get('selectOtherProductFoodAndBev/:productId')
  selectOtherProductFoodAndBev(@Param() params) {
    return this.productDataService.selectOtherProductFoodAndBev(
      params.productId,
    );
  }

  @Get('selectOtherProductFurniture/:productId')
  selectOtherProductFurniture(@Param() params) {
    return this.productDataService.selectOtherProductFurniture(
      params.productId,
    );
  }

  @Get('selectOtherProductElectronic/:productId')
  selectOtherProductElectronic(@Param() params) {
    return this.productDataService.selectOtherProductElectronic(
      params.productId,
    );
  }

  @Get('selectOtherProductTile/:productId')
  selectOtherProductTile(@Param() params) {
    return this.productDataService.selectOtherProductTile(params.productId);
  }
}
