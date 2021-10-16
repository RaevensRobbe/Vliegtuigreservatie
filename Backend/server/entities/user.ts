import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Ticket } from "./ticket"

@Entity('user') // The table name
export class User {
    @PrimaryGeneratedColumn('uuid') // Generated as UUID in the database
    userid?: string

    @Column({length: 30})
    name?: string;

    @Column({length: 30})
    preName?: string;

    @Column('int')
    age?: number;
    
    @Column({length: 100})
    email?: string;

    @Column({length: 50})
    gender?: string;
    
    @Column()
    admin?: boolean;

    @OneToMany(() => Ticket, ticket => ticket.user)
    ticket!: Ticket[];

}