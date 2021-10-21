import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { Flight } from "./flight"

@Entity('plane') // The table name
export class Plane {
    @PrimaryColumn({unique: true})
    PlaneId?: number

    @Column({unique: true})
    Name?: string

    @Column()
    Type?: string
    
    @Column('int')
    BusinessSeats?: number

    @Column('int')
    FirstClassSeats?: number

    @OneToMany(() => Flight, flight => flight.Plane)
    Flight?: Flight[]; 

}