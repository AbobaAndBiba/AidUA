declare namespace NodeJS {
    export interface ProcessEnv {
        PORT: number;
        POSTGRESQL_URL: string;
        JWT_SECRET: string;
        STATIC_PATH: string;
        IMAGES_PATH: string;
    }
}

declare namespace Express {
    namespace Multer {
        interface File {
            fieldname: string;
            originalname: string;
            encoding: string;
            mimetype: string;
            size: number;
            stream: Readable;
            destination: string;
            filename: string;
            path: string;
            buffer: Buffer;
        }
    }
    export interface Admin {
        id: string;
        login: string;
    }
}