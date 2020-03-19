import { Controller, Param, Get, Post, Body } from '@nestjs/common';
import { UserDataService } from './user-data.service';
import { Address } from './models/address/address.entity';
import { ScanHistory } from './models/scan-history/scan-history.entity';
import { User } from './models/user/user.entity';
import { Seller } from './models/seller/seller.entity';
import { Admin } from './models/admin/admin.entity';

@Controller('user-data')
export class UserDataController {
  constructor(private userDataService: UserDataService) {}

  @Get('getUserAddressByUuid/:uuid')
  getUserAddressByUuid(@Param() params): Promise<any[]> {
    return this.userDataService.getUserAddressByUuid(params.uuid);
  }

  @Get('getUserAddressByAddressId/:addressId')
  getUserAddressByAddressId(@Param() params): Promise<any> {
    return this.userDataService.getUserAddressByAddressId(params.addressId);
  }

  @Get('getUserList/')
  getUserList(): Promise<any[]> {
    return this.userDataService.getUserList();
  }

  @Get('getSellerList/:sellerUuid')
  getSellerList(@Param() params): Promise<any[]> {
    return this.userDataService.getSellerList(params.sellerUuid);
  }

  @Post('insertUserAddress/')
  insertUserAddress(@Body() address: Address) {
    return this.userDataService.insertUserAddress(address);
  }

  @Get('getUserDataScanHistory/:uuid')
  getUserDataScanHistory(@Param() params) {
    return this.userDataService.getUserDataScanHistory(params.uuid);
  }

  @Get('checkUserRole/:uuid')
  checkUserRole(@Param() params) {
    return this.userDataService.checkUserRole(params.uuid);
  }

  @Post('insertUserDataScanHistory/')
  insertUserDataScanHistory(@Body() scanHistory: ScanHistory) {
    return this.userDataService.insertUserDataScanHistory(scanHistory);
  }

  @Post('ifUserExist/')
  ifUserExist(@Body() user: User) {
    return this.userDataService.ifUserExist(user);
  }

  @Post('ifSellerExist/')
  ifSellerExist(@Body() seller: Seller) {
    return this.userDataService.ifSellerExist(seller);
  }
  
  @Post('ifAdminExist/')
  ifAdminExist(@Body() admin: Admin) {
    return this.userDataService.ifAdminExist(admin);
  }
}
