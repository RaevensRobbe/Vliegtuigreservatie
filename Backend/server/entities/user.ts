import { Guid } from "guid-typescript";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { Ticket } from "./ticket"

@Entity('user') // The table name
export class User {
    @PrimaryColumn({unique: true})
    UserId?: string

    @Column({length: 30})
    Name?: string;

    // @Column({length: 30})
    // PreName?: string;

    // @Column('int')
    // Age?: number;
    
    @Column({length: 100})
    Email?: string;

    // @Column({length: 50})
    // Gender?: string;
    
    @Column()
    Admin?: boolean;

    @OneToMany(() => Ticket, ticket => ticket.User)
    Ticket?: Ticket[];

}