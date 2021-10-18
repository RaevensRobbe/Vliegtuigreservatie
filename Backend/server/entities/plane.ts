import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Flight } from "./flight"

@Entity('plane') // The table name
export class Plane {
    @PrimaryGeneratedColumn('uuid') // Generated as UUID in the database
    Planeid?: string

    @Column({unique: true})
    Name?: string

    @Column()
    Type?: string
    
    @Column('int')
    BusinessSeats?: number

    @Column('int')
    FirstClassSeats?: number

    @OneToMany(() => Flight, flight => flight.Plane)
    Flights!: Flight[]; 

}