import { Controller, Param, Get, Post, Body } from '@nestjs/common';
import { UserDataService } from './user-data.service';
import { Address } from './models/address/address.entity';
import { ScanHistory } from './models/scan-history/scan-history.entity';
import { User } from './models/user/user.entity';

@Controller('user-data')
export class UserDataController {
    constructor(private userDataService:UserDataService){}

    @Get("selectUserData/:uuid")
    selectUserData(@Param() params) : Promise<any[]>{
        return this.userDataService.selectUserData(params.uuid)
    }

    @Post("insertUserAddress/")
    insertUserAddress(@Body() address:Address){
        return this.userDataService.insertUserAddress(address)
    }

    @Get("getUserDataScanHistory/:uuid")
    getUserDataScanHistory(@Param() params){
        return this.userDataService.getUserDataScanHistory(params.uuid)
    }

    @Post("insertUserDataScanHistory/")
    insertUserDataScanHistory(@Body() scanHistory:ScanHistory){
        return this.userDataService.insertUserDataScanHistory(scanHistory)
    }

    @Post("ifUserExist/")
    ifUserExist(@Body() user:User){
        return this.userDataService.ifUserExist(user)
    }
    
}
