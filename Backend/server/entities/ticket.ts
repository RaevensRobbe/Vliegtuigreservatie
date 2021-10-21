import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm"
import { Flight } from "./flight"
import { User } from "./user"

@Entity('ticket') // The table name
export class Ticket {
    @PrimaryColumn({unique: true})
    TicketId?: number

    @Column('simple-json')
    Seat?: [{column:string,row:string}]

    @Column('bool')
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

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    User?: User;

    @ManyToOne(() => Flight)
    @JoinColumn({ name: "flight_id" })
    Flight?: Flight
}