import * as path from 'path';

export const STATIC_PATH = path.resolve(__dirname, process.env.STATIC_PATH) || 'not defined';