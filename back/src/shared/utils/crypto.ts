import { createHash } from 'crypto';

export interface CryptoFunction {
    (input: string): string;
}

export const sha256Hash: CryptoFunction = (input: string): string => {
    const crypto = require('crypto');
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
};

export const md5Hash: CryptoFunction = (input: string): string => {
    const crypto = require('crypto');
    const hash = crypto.createHash('md5');
    hash.update(input);
    return hash.digest('hex');
};
