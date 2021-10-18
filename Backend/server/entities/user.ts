import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Ticket } from "./ticket"

@Entity('user') // The table name
export class User {
    @PrimaryGeneratedColumn('uuid') // Generated as UUID in the database
    Userid?: string

    @Column({length: 30})
    Name?: string;

    @Column({length: 30})
    PreName?: string;

    @Column('int')
    Age?: number;
    
    @Column({length: 100})
    Email?: string;

    @Column({length: 50})
    Gender?: string;
    
    @Column()
    Admin?: boolean;

    @OneToMany(() => Ticket, ticket => ticket.User)
    Ticket!: Ticket[];

}