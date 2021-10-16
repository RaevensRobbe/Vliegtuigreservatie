import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Flight } from "./flight"
import { User } from "./user"

@Entity('ticket') // The table name
export class Ticket {
    @PrimaryGeneratedColumn('uuid') // Generated as UUID in the database
    ticketid?: string

    @Column('simple-json')
    seat?: Record<string,string>

    @Column()
    return?: boolean

    @Column()
    class?: string

    @Column('date')
    returnDate?: Date

    @Column('simple-json')
    persons?: Record<number, string>

    @Column('int')
    gate?: number

    @Column('')
    rating?: string

    @ManyToOne(() => User, user => user.ticket)
    @JoinColumn({ name: "user_id" })
    user!: User;

    @ManyToOne(() => Flight, flight => flight.ticket)
    @JoinColumn({ name: "ticket_id" })
    flight!: Flight
}