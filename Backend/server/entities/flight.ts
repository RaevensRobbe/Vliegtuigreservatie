import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('flight') // The table name
export class Flight {
    @PrimaryGeneratedColumn('uuid') // Generated as UUID in the database
    Flightid?: string

    @Column('date')
    Date?: string

    @Column('double')
    Price?: number
}