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
    businessSeats?: number

    @Column('int')
    firstClassSeats?: number

    @OneToMany(() => Flight, flight => flight.plane)
    flights!: Flight[]; 

}