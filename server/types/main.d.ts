declare namespace NodeJS {
    export interface ProcessEnv {
        PORT: number;
        POSTGRESQL_URL: string;
        JWT_SECRET: string;
    }
}

declare namespace Express {
    export interface Admin {
        id: string;
        login: string;
    }
}