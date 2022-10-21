import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthorRepository } from 'src/author/author.repository';
import { IsLogedInGuard } from 'src/guards/is-loged-in.guard';
import { PickupPointRepository } from 'src/pickup-point/pickup-point.repository';
import { PrivilegeToAidRepository } from 'src/privilege-to-aid/privilege-to-aid.repository';
import { AidRepository } from './aid.repository';
import { AidService } from './aid.service';
import { AddPrivilegesToAidDto } from './dto/add-privileges-to-aid.dto';
import { CreateAidDto } from './dto/create-aid.dto';
import { RemovePrivilegesFromAidDto } from './dto/remove-privileges-from-aid.dto';
import { UpdateAidDto } from './dto/update-aid.dto';
import { addPrivilegesToAidMapper } from './mappers/add-privileges-to-aid.mapper';
import { createAidMapper } from './mappers/create-aid.mapper';
import { removePrivilegesFromAidMapper } from './mappers/remove-privileges-from-aid.mapper';
import { updateAidMapper } from './mappers/update-aid.mapper';

@Controller('aid')
export class AidController {
    constructor(private aidRepository: AidRepository,
                private aidService: AidService,
                private authorRepository: AuthorRepository,
                private privilegeToAidRepository: PrivilegeToAidRepository,
                private pickupPointRepository: PickupPointRepository){}

    @Post()
    @UseGuards(IsLogedInGuard)
    @HttpCode(201)
    async create(@Body() dto: CreateAidDto) {
        dto = createAidMapper.fromFrontToController(dto);
        const author = await this.authorRepository.getOneByName(dto.authorName);
        if(!author)
            throw new HttpException('This author was not found.', 404);
        const id = await this.aidRepository.generateId();
        delete dto.authorName;
        const aid = await this.aidRepository.create({...dto, id, authorId: author.id});
        return aid;
    }

    @Post('/add-privileges/:id')
    @UseGuards(IsLogedInGuard)
    async addPrivileges(@Body() dto: AddPrivilegesToAidDto, @Param('id') id: string) {
        dto = addPrivilegesToAidMapper.fromFrontToController({...dto, aidId: id});
        const aid = await this.aidRepository.getOneById(dto.aidId);
        if(!aid)
            throw new HttpException('This aid was not found.', 404);
        return this.aidService.addPrivileges(dto.privileges, aid.id);
    }

    @Get('/:id')
    async getOneById(@Param('id') id: string) {
        const aid = await this.aidRepository.getOneById(id);
        if(!aid)
            throw new HttpException('This aid was not found.', 404);
        return aid;
    }

    @Get()
    async getMany(){
        return this.aidRepository.getMany();
    }

    @Patch('/:id')
    @UseGuards(IsLogedInGuard)
    async update(@Body() dto: UpdateAidDto, @Param('id') id: string) {
        dto = updateAidMapper.fromFrontToController(dto);
        let aid = await this.aidRepository.getOneById(id);
        if(!aid)
            throw new HttpException('This aid was not found.', 404);
        if(dto.authorName) {
            const author = await this.authorRepository.getOneById(dto.authorName);
            if(!author)
                delete dto.authorName;
        }
        return this.aidRepository.update(dto, id);
    }

    @Delete('/:id')
    @UseGuards(IsLogedInGuard)
    async delete(@Param('id') id: string) {
        const aid = await this.aidRepository.getOneById(id);
        if(!aid)
            throw new HttpException('This aid was not found.', 404);
        await this.pickupPointRepository.deleteManyByAidId(aid.id);
        await this.privilegeToAidRepository.deleteManyByAidId(aid.id);
        await this.aidRepository.delete(aid.id);
        return { message: 'The aid has been delete successfully.' };
    }

    @Delete('/remove-privileges/:id')
    @UseGuards(IsLogedInGuard)
    async removePrivileges(@Body() dto: RemovePrivilegesFromAidDto, @Param('id') id: string) {
        dto = removePrivilegesFromAidMapper.fromFrontToController({...dto, aidId: id});
        const aid = await this.aidRepository.getOneById(dto.aidId);
        if(!aid)
            throw new HttpException('This aid was not found.', 404);
        return this.aidService.removePrivileges(dto.privileges, aid.id);
    }
}
