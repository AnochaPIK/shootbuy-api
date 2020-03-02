import { Module } from '@nestjs/common';
import { UserDataService } from './user-data.service';
import { UserDataController } from './user-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './models/address/address.entity';
import { ScanHistory } from './models/scan-history/scan-history.entity';
import { User } from './models/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address,ScanHistory,User])], 
  providers: [UserDataService],
  controllers: [UserDataController]
})
export class UserDataModule {}
