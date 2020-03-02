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
}
