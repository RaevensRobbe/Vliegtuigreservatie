import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Flight } from "./flight"
import { User } from "./user"

@Entity('ticket') // The table name
export class Ticket {
    @PrimaryGeneratedColumn('uuid')
    TicketId?: number

    @Column('simple-json')
    Seat?: [{class:string,column:string,row:number}]

    @Column('bool')
    Return?: boolean

    @Column('datetime',{nullable:true})
    ReturnDate?: string

    @Column('simple-array')
    Persons?: string[]

    @Column('')
    Rating?: number

    @Column({length:256})
    Review?: string

    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    User?: User;

    @ManyToOne(() => Flight)
    @JoinColumn({ name: "flightId" })
    Flight?: Flight
}