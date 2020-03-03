import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './models/address/address.entity';
import { ScanHistory } from './models/scan-history/scan-history.entity';
import { User } from './models/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserDataService {
    constructor(
        @InjectRepository(Address) private addressRepository: Repository<Address>,
        @InjectRepository(ScanHistory) private scanHistoryRepository: Repository<ScanHistory>,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }

    async selectUserData(email): Promise<any[]> {
        const query = await this.userRepository.find({
            relations: ["address"],
            where: {
                email: email
            }
        })
        return query
    }

    async insertUserAddress(address: Address) {
        return await this.addressRepository.save(address)
    }

    async getUserDataScanHistory(email) : Promise<any[]>{
        const selectData = this.scanHistoryRepository.find({
            relations : ["product"],
            where:{
                email : email
            }
        })
        return selectData
    }

    
}
