import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './models/address/address.entity';
import { ScanHistory } from './models/scan-history/scan-history.entity';
import { User } from './models/user/user.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/product-data/models/product/product.entity';
import * as moment from 'moment'
@Injectable()
export class UserDataService {
    constructor(
        @InjectRepository(Address) private addressRepository: Repository<Address>,
        @InjectRepository(ScanHistory) private scanHistoryRepository: Repository<ScanHistory>,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }

    async getUserAddressByUuid(uuid): Promise<any[]> {
        const query = await this.userRepository.find({
            relations: ["address"],
            where: {
                uuid: uuid
            }
        })
        return query
    }

    async getUserList(): Promise<any[]>{
        const query = await this.userRepository.find()
        return query
    }

    async ifUserExist(user : User){
        var userData = await this.userRepository.find({
            where:{
                uuid : user.uuid
            }
        })
        if(userData.length == 0 )
        return await this.userRepository.save(user)
    }

    async insertUserAddress(address: Address) {
        return await this.addressRepository.save(address)
    }

    async getUserDataScanHistory(uuid) {
        var selectData = await this.userRepository.createQueryBuilder("user")
        .innerJoinAndSelect("user.scanHistory","scanHistory")
        .innerJoinAndSelect("scanHistory.product","product")
        .innerJoinAndSelect("product.category","category")
        .where("user.uuid = :uuid",{uuid : uuid})
        .getMany()
        // selectProductOrder[0].orderDateTime = moment(selectProductOrder[0].orderDateTime).format('DD-MM-YYYY')

        selectData[0].scanHistory.forEach(ScanHistory => ScanHistory.scanDateTime = moment(ScanHistory.scanDateTime).format('DD/MM/YYYY'))
        return selectData
    }

    async insertUserDataScanHistory(scanHistory: ScanHistory) { 
        scanHistory.scanDateTime = null
        await this.scanHistoryRepository.save(scanHistory)
    }

 
}
