import {EntityRepository, Repository} from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Login } from './login.entity';
import { LoginDto } from './dto/login.dto';

@EntityRepository(Login)
export class LoginRepository extends Repository <Login> {

    /**
     * 
     * @param userId 
     * @param loginDto 
     * @returns 
     */
    async createAuthenticationToken(id: number, email: string): Promise<any> {
        return this.save({id, email});
    }

    /**
     * 
     * @param id 
     * @param jwtToken 
     * @returns 
     */
    async saveAuthenticationToken(id: number, jwtToken: string): Promise<Login> {
        return this.save({id, token: jwtToken, is_active: 1});
    }

    /**
     * 
     * @param token 
     * @param isActive 
     * @returns 
     */
    async logout(token: string, isActive: number): Promise<Login> {
        return this.save({token, is_active: isActive});
    }

    /**
     * 
     * @param token 
     * @returns 
     */
    async verifyToken(token: string): Promise<Login> {
        const found  =  await this.findOne({where: {token}});
        if (!found) {
            throw new NotFoundException (`User token: ${token} not found`);
        }
        return found;
    }

     /**
     * 
     * @param token 
     * @returns 
     */
      async getLoginUserById(id: string): Promise<Login> {
        const found  =  await this.findOne({where: {id}});
        if (!found) {
            throw new NotFoundException (`User with: ${id} not found`);
        }
        return found;
    }
}
