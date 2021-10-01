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
