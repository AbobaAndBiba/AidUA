export interface IFileUpload {
    uploadFile(file: Express.Multer.File, dirPath: string): string,
    generateFilePath(file: Express.Multer.File, dirPath: string): string,
    deleteFile(filePath: string): string
}