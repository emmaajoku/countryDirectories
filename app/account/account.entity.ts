import { Entity,  Column, PrimaryGeneratedColumn, Index, PrimaryColumn } from 'typeorm';

@Entity()
@Index(['email'])
    // tslint:disable: variable-name
export class Account {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', default : null, nullable: true})
    firstname: string;

    @Column({type: 'varchar', nullable: true})
    lastname: string;

    @Column({type: 'varchar', nullable: true, default: null})
    email: string;

    @Column({type: 'varchar', nullable: true})
    phone_number: string;

    @Column({type: 'text', default : null, nullable: true})
    password: string;

    @Column({type: 'int', default : 1})
    is_active: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    public updated_at: Date;
}
