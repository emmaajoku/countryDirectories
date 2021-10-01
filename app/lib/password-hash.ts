import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';


/**
 * This is for the final password hash in the database for the current service.
 * @param password The password to be temporarily hashed
 */
export const hashPassword = async ( password : string ): Promise<string> => {
    const saltRounds : number = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}

/**
 * 
 * @param password 
 * @param hash 
 * @returns 
 */
export const matchPasswordHash = async ( password : string, hash : string ) => {
    const match = await bcrypt.compare(password, hash);
    return match;
}

// /**
//  * algorithm 
//  * @returns {string}
//  */
// const getAlgorithm = (): string =>  {
//     return 'aes-192-cbc';
// }

// /**
//  * hashKey
//  * @returns {string}
//  */
// const getHashKey = () : string =>  {
//     return crypto.createHash("sha256").digest('hex').slice(0,24); 
// }

// /**
//  * initialization vector
//  * @returns {string}
//  */
// const getInitializationVector = (): string =>  {
//     return crypto.randomBytes(16).toString('hex').slice(0, 16); 
// }

// /**
//  * creating temporary hash for the passwords stored in redis before a permanent hash is used  when moving data from redis to the db
//  * @param password The password to be temporarily hashed
//  */
// export const createTemporaryHash = (password : string) => {
//     const cipher : crypto.Cipher = crypto.createCipheriv(getAlgorithm(), getHashKey(), getInitializationVector());
//     let temporaryHash : string = cipher.update(password, 'utf8', 'hex');
//     temporaryHash += cipher.final('hex');
//     return temporaryHash;
// }

// /**
//  * 
//  * @param password 
//  * @returns 
//  */
// export const decipherTemporaryHash = (password : string) =>  {
//     const decipher : crypto.Decipher = crypto.createDecipheriv(getAlgorithm(), getHashKey(), getInitializationVector());
//     let decryptedHash : string = decipher.update(password, 'hex', 'utf8');
//     decryptedHash += decipher.final('utf8');
//     return decryptedHash;
// }