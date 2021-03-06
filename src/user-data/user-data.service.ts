import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './models/address/address.entity';
import { ScanHistory } from './models/scan-history/scan-history.entity';
import { User } from './models/user/user.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/product-data/models/product/product.entity';
import * as moment from 'moment';
import { Admin } from './models/admin/admin.entity';
import { Seller } from './models/seller/seller.entity';
@Injectable()
export class UserDataService {
  constructor(
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    @InjectRepository(ScanHistory)
    private scanHistoryRepository: Repository<ScanHistory>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    @InjectRepository(Seller) private sellerRepository: Repository<Seller>,
  ) {}

  async getUserAddressByUuid(uuid): Promise<any[]> {
    const query = await this.userRepository.find({
      relations: ['address'],
      where: {
        uuid: uuid,
      },
    });
    return query;
  }

  async getUserAddressByAddressId(addressId): Promise<any> {
    const query = await this.addressRepository.findOne({
      where: {
        addressId: addressId,
      },
    });
    return query;
  }

  async getUserList(): Promise<any[]> {
    const query = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.order', 'order')
      .leftJoinAndSelect('order.orderDetail', 'orderDetail')
      .leftJoinAndSelect('orderDetail.product', 'product')
      .where('order.orderStatus != 0')
      .orderBy('order.orderStatus', 'ASC')
      .addOrderBy('order.orderId','DESC')
      .getMany();
    return query;
  }

  async getSellerList(sellerUuid): Promise<any[]> {
    const query = await this.sellerRepository
      .createQueryBuilder('seller')
      .where('seller.sellerUuid != :sellerUuid', { sellerUuid: sellerUuid })
      .getMany();
    return query;
  }

  async ifUserExist(user: User) {
    var userData = await this.userRepository.find({
      where: {
        uuid: user.uuid,
      },
    });
    if (userData.length == 0) {
      return await this.userRepository.save(user);
    }
    return userData[0];
  }

  async ifSellerExist(seller: Seller) {
    var sellerData = await this.sellerRepository.find({
      where: {
        sellerUuid: seller.sellerUuid,
      },
    });
    if (sellerData.length == 0) {
      return await this.sellerRepository.save(seller);
    }
    return sellerData[0];
  }

  async ifAdminExist(uuid): Promise<any[]> {
    var adminData = await this.adminRepository.find({
      where: {
        adminUuid: uuid,
      },
    });
    return adminData;
  }

  async checkUserRole(uuid): Promise<any[]> {
    var userData = await this.userRepository.find({
      where: {
        uuid: uuid,
      },
    });
    return userData;
  }

  async insertUserAddress(address: Address) {
    return await this.addressRepository.save(address);
  }

  async getUserDataScanHistory(uuid) {
    var selectData = await this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.scanHistory', 'scanHistory')
      .innerJoinAndSelect('scanHistory.product', 'product')
      .innerJoinAndSelect('product.category', 'category')
      .where('user.uuid = :uuid', { uuid: uuid })
      .orderBy('scanHistory.scanDateTime', 'DESC')

      .getMany();

    // selectData[0].scanHistory.forEach(
    //   ScanHistory =>
    //     (ScanHistory.scanDateTime = moment(ScanHistory.scanDateTime).format(
    //       'DD/MM/YYYY',
    //     )),
    // );
    return selectData;
  }

  async insertUserDataScanHistory(scanHistory: ScanHistory) {
    scanHistory.scanDateTime = null;
    await this.scanHistoryRepository.save(scanHistory);
  }
}
