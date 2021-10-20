import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Destination } from "./destination"
import { Plane } from "./plane"
import { Ticket } from "./ticket"

@Entity('flight') // The table name
export class Flight {
    @PrimaryGeneratedColumn('uuid') // Generated as UUID in the database
    uuid?: string

    @Column({unique: true})
    FlightId?: number

    @Column('datetime')
    Date?: string

    @Column('double')
    Price?: number

    @Column('int')
    Gate?: number

    @OneToMany(() => Ticket, ticket => ticket.Flight)
    Ticket!: Ticket[]

    @ManyToOne(() => Destination, dest => dest.Destination)
    @JoinColumn({ name: "destination_id"})
    Destination!: Destination

    @ManyToOne(() => Destination, dest => dest.Start)
    @JoinColumn({ name: "start_id"})
    Start!: Destination
    

    @ManyToOne(() => Plane, plane => plane.Flights)
    @JoinColumn({ name: "plane_id" })
    Plane!: Plane
}