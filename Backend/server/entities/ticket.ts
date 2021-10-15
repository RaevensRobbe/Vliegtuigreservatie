import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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
    Rating?: string
}