import { SignUpDto } from './dto/signup.dto';
import { SignupData } from './../lib/utils';
import {EntityRepository, Repository} from 'typeorm';
import { Account } from './account.entity';
import { BadRequestException, NotFoundException, Logger } from '@nestjs/common';

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {

    /**
     * 
     * @param accountData 
     * @returns 
     */
    async saveAccount(id: number, accountData: SignUpDto): Promise<Account> {
        try {
            const newAccount =  await this.save({id, ...accountData});
            // const {password, confirm_password, ...registeredAccount} = newAccount;
            return newAccount;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    /**
     * 
     * @param accountData 
     * @returns 
     */
         async createAccount(signUpDto: SignUpDto): Promise<unknown> {
            try {
                const newAccount = await this.insert({...signUpDto});
                Logger.debug(JSON.stringify(newAccount));
                const {identifiers, raw, ...generatedMaps} = newAccount;
                return generatedMaps;
            } catch (error) {
                throw new BadRequestException(error.message);
            }
        }

    /**
     * 
     * @param email 
     * @returns 
     */
    async getUserAccountByEmail(email: string): Promise<Account> {

        try {
            return await this.findOne({ where : {email }});
        } catch (error) {
            throw new NotFoundException(error.toString());
        }
    }

}