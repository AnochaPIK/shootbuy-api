import { Controller, Param, Get, Post, Body } from '@nestjs/common';
import { UserDataService } from './user-data.service';
import { Address } from './models/address/address.entity';

@Controller('user-data')
export class UserDataController {
    constructor(private userDataService:UserDataService){}

    @Get("selectUserData/:email")
    selectUserData(@Param() params) : Promise<any[]>{
        return this.userDataService.selectUserData(params.email)
    }

    @Post("insertUserAddress/")
    insertUserAddress(@Body() address:Address){
        return this.userDataService.insertUserAddress(address)
    }

    @Get("getUserDataScanHistory/:email")
    getUserDataScanHistory(@Param() params) : Promise<any[]>{
        return this.userDataService.getUserDataScanHistory(params.email)
    }
}
