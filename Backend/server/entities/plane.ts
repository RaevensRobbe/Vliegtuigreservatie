import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Flight } from "./flight"

@Entity('plane') // The table name
export class Plane {
    @PrimaryGeneratedColumn('uuid')
    PlaneId?: string

    @Column({unique: true})
    Name?: string

    @Column()
    Type?: string
    
    @Column('int')
    EconomySeats?: number

    @Column('int')
    BusinessSeats?: number

    @OneToMany(() => Flight, flight => flight.Plane)
    Flight?: Flight[]; 

}