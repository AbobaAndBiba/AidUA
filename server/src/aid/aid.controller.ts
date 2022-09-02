import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { IsLogedInGuard } from 'src/guards/is-loged-in.guard';
import { IAidServiceRequest } from './aid.service';
import { CreateAidDto } from './dto/create-aid.dto';
import { UpdateAidDto } from './dto/update-aid.dto';

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
