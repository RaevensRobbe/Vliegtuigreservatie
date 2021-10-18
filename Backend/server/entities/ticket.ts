import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Flight } from "./flight"
import { User } from "./user"

@Entity('ticket') // The table name
export class Ticket {
    @PrimaryGeneratedColumn('uuid') // Generated as UUID in the database
    Ticketid?: string

    @Column('simple-json')
    Seat?: Record<string,string>

    @Column()
    Return?: boolean

    @Column()
    Class?: string

    @Column('date')
    ReturnDate?: Date

    @Column('simple-json')
    Persons?: Record<number, string>

    @Column('int')
    Gate?: number

    @Column('')
    Rating?: number

    @Column('')
    Review?: string

    @Column()
    Populairity?: string

    @ManyToOne(() => User, user => user.Ticket)
    @JoinColumn({ name: "user_id" })
    User!: User;

    @ManyToOne(() => Flight, flight => flight.Ticket)
    @JoinColumn({ name: "ticket_id" })
    Flight!: Flight
}