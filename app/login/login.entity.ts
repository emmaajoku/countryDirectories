import { IsEmail, IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
    // tslint:disable: variable-name
export class Login {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({type: 'text', nullable: true})
    token: string;

    @Column({type: 'bigint', nullable: true })
    user_id: number;

    @IsNotEmpty()
    @IsEmail()
    @Column({type: 'varchar', nullable: true })
    email: string;

    @Column({type: 'int', default : 1})
    is_active: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    public created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    public updated_at: Date;
}
