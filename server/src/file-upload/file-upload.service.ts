import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 } from "uuid";
import { IFileUpload } from './interfaces/file-upload.service.interface';

@Injectable()
export class FileUploadService implements IFileUpload {
    uploadFile(file: Express.Multer.File, dirPath: string): string {
        const filePath = this.generateFilePath(file, dirPath);
        if(!fs.existsSync(dirPath))
            fs.mkdirSync(dirPath, {recursive: true});
        fs.writeFileSync(filePath, file.buffer);
        return filePath;
    }

    generateFilePath(file: Express.Multer.File, dirPath: string): string {
        const extension = file.originalname.split('.').pop();
        let filePath;
        do {
            const fileName = v4();
            filePath = path.resolve(dirPath, fileName) + `.${extension}`;
        } while (fs.existsSync(filePath));
        return filePath;
    }

    deleteFile(filePath: string): string {
        if(!fs.existsSync(filePath))
            return null;
        fs.unlinkSync(filePath);
        return filePath;
    }
}
