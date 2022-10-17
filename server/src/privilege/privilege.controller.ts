import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { IsLogedInGuard } from 'src/guards/is-loged-in.guard';
import { PrivilegeToAidRepository } from 'src/privilege-to-aid/privilege-to-aid.repository';
import { CreatePrivilegeDto } from './dto/create-privilege.dto';
import { UpdatePrivilegeDto } from './dto/update-privilege.dto';
import { createPrivilegeMapper } from './mappers/create-privilege.mapper';
import { updatePrivilegeMapper } from './mappers/update-privilege.mapper';
import { PrivilegeRepository } from './privilege.repository';

@Controller('privilege')
export class PrivilegeController {
    constructor(private privilegeRepository: PrivilegeRepository,
                private privilegeToAidRepository: PrivilegeToAidRepository){}

    @Post()
    @UseGuards(IsLogedInGuard)
    @HttpCode(201)
    async create(@Body() dto: CreatePrivilegeDto) {
        dto = createPrivilegeMapper.fromControllerToService(dto);
        const privilege = await this.privilegeRepository.getOneByName(dto.name);
        if(privilege)
            throw new HttpException('This privilege already exists', 400);
        const id = await this.privilegeRepository.generateId();
        return this.privilegeRepository.create({...dto, id});
    }

    @Get('/:id')
    @UseGuards(IsLogedInGuard)
    async getOneById(@Param('id') id: string) {
        const privilege = await this.privilegeRepository.getOneById(id);
        if(!privilege)
            throw new HttpException('This privilege was not found', 404);
        return privilege;
    }

    @Get()
    @UseGuards(IsLogedInGuard)
    async getMany(){
        return this.privilegeRepository.getMany();
    }

    @Patch('/:id')
    @UseGuards(IsLogedInGuard)
    async update(@Body() dto: UpdatePrivilegeDto, @Param('id') id: string) {
        dto = updatePrivilegeMapper.fromControllerToService(dto);
        const privilege = await this.privilegeRepository.getOneById(id);
        if(!privilege)
            throw new HttpException('This privilege was not found', 404);
        if(dto.name) {
            const nameExists = await this.privilegeRepository.getOneByName(dto.name);
            if(nameExists)
                throw new HttpException('This privilege already exists', 400);
        }
        return this.privilegeRepository.update(dto, privilege.id);
    }

    @Delete('/:id')
    @UseGuards(IsLogedInGuard)
    async delete(@Param('id') id: string) {
        const privilege = await this.privilegeRepository.getOneById(id);
        if(!privilege)
            throw new HttpException('This privilege was not found', 404);
        await this.privilegeToAidRepository.deleteManyByPrivilegeId(privilege.id);
        await this.privilegeRepository.delete(privilege.id);
        return { message: 'The privilege has been delete successfully'};
    }
}
