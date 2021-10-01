import { SignUpDto } from './dto/signup.dto';
import { Account } from './account.entity';
import { Injectable, BadRequestException, NotFoundException, Logger, UnprocessableEntityException } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { hashPassword } from 'app/lib/password-hash';

@Injectable()
export class AccountService {
    private logger: any;

    constructor(
        private readonly accountRepository: AccountRepository,
    ) {
        this.logger  =  Logger;
    }



    /**
     * 
     * @param accountDetails 
     * @returns 
     */
    async signUp(accountDetails: SignUpDto) {
        try {
            const emailExists = await this.checkEmailExists(accountDetails.email);
            if (emailExists) {
                throw new UnprocessableEntityException('Email already exists');
            }
            return await this.createNewAccount(accountDetails);
        } catch ( error: any) {
            this.logger.error(error.toString());
            throw new BadRequestException(error);
        };

    }

    /**
     * 
     * @param email 
     * @returns 
     */
     async checkEmailExists(email: string) {
        try {
            const accountCheck = await this.accountRepository.getUserAccountByEmail(email);
            if (accountCheck && accountCheck.email) {
                return true;
            }
            return  false;
        } catch (error) {
            this.logger.error(error.toString());
            throw new BadRequestException(error);
        }

    }

    /**
     * 
     * @param accountDetails 
     * @returns 
     */
    async createNewAccount(accountDetails: SignUpDto): Promise<unknown> {
        const {...accountData} = accountDetails;
        const passwordHash: string = await hashPassword(accountDetails.password);
        accountData.password = passwordHash;
        return this.accountRepository.createAccount(accountData);
    }

    /**
     * 
     * @param email 
     * @returns 
     */
    async getUserByEmail(email: string): Promise<Account> {
        try {
            return await this.accountRepository.getUserAccountByEmail(email);
        }catch (e) {
            this.logger.error(e.toString());
            throw new NotFoundException(e)
        }
    }

}
