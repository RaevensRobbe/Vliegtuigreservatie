import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Flight } from "./flight"
import { User } from "./user"

@Entity('ticket') // The table name
export class Ticket {
    @PrimaryGeneratedColumn('uuid') // Generated as UUID in the database
    uuid?: string

    @Column({unique: true})
    TicketId?: number

    @Column('simple-json')
    Seat?: [{column:string,row:string}]

    @Column()
    Return?: boolean

    @Column('simple-array')
    Class?: string[]

    @Column('datetime',{nullable:true})
    ReturnDate?: string

    @Column('simple-array')
    Persons?: string[]

    @Column('')
    Rating?: number

    @Column({length:256})
    Review?: string

    @ManyToOne(() => User, user => user.Ticket)
    @JoinColumn({ name: "user_id" })
    User!: User;

    @ManyToOne(() => Flight, flight => flight.Ticket)
    @JoinColumn({ name: "flight_id" })
    Flight!: Flight
}