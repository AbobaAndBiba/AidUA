import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { IsLogedInGuard } from 'src/guards/is-loged-in.guard';
import { CreateAidDto } from './dto/create-aid.dto';
import { UpdateAidDto } from './dto/update-aid.dto';
import { IAidServiceRequest } from './interfaces/aid.service.request.interface';

@Controller('aid')
export class AidController {
    constructor(@Inject('IAidServiceRequest') private readonly aidService: IAidServiceRequest){}

    @Post('/')
    @UseGuards(IsLogedInGuard)
    @HttpCode(201)
    create(@Body() dto: CreateAidDto) {
        return this.aidService.createReq(dto);
    }

    @Get('/:id')
    getOneById(@Param('id') id: string) {
        return this.aidService.getOneByIdReq(id);
    }

    @Get('/')
    getMany(){
        return this.aidService.getManyReq();
    }

    @Patch('/:id')
    @UseGuards(IsLogedInGuard)
    update(@Body() dto: UpdateAidDto, @Param('id') id: string) {
        return this.aidService.updateReq(dto, id);
    }

    @Delete('/:id')
    @UseGuards(IsLogedInGuard)
    delete(@Param('id') id: string) {
        return this.aidService.deleteReq(id);
    }
}
