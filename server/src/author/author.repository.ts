import { Injectable } from '@nestjs/common';
import { Author, Prisma } from 'prisma/generated/client';
import { AidUAService } from 'src/db/aid-ua.prisma.service';
import { IAuthorRepository } from './interfaces/author.repository.interface';
import { v4 } from "uuid";

@Injectable()
export class AuthorRepository implements IAuthorRepository {
    constructor(private aidUAService: AidUAService){}

    async create(dto: Prisma.AuthorUncheckedCreateInput): Promise<Author> {
        return this.aidUAService.author.create({data: dto});
    }

    async getOneById(id: string): Promise<Author> {
        return this.aidUAService.author.findUnique({where: {id}});
    }

    async getMany(): Promise<Author[]> {
        return this.aidUAService.author.findMany();
    }

    async update(dto: Prisma.AuthorUncheckedUpdateInput, id: string): Promise<Author> {
        return this.aidUAService.author.update({data: dto, where: {id}});
    }

    async delete(id: string): Promise<Author> {
        return this.aidUAService.author.delete({where: {id}});
    }

    async getOneByName(name: string): Promise<Author> {
        return this.aidUAService.author.findFirst({where: {name}});
    }

    async generateId(): Promise<string> {
        let author: Author | null, id: string;
        do {
            id = v4();
            author = await this.aidUAService.author.findUnique({where: {id}});
        } while (author);
        return id;
    }
}
