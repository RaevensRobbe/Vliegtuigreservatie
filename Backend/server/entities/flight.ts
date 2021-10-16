import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Destination } from "./destination"
import { Plane } from "./plane"
import { Ticket } from "./ticket"

@Entity('flight') // The table name
export class Flight {
    @PrimaryGeneratedColumn('uuid') // Generated as UUID in the database
    Flightid?: string

    @Column('date')
    Date?: string

    @Column('double')
    Price?: number

    @OneToMany(() => Ticket, ticket => ticket.flight)
    ticket!: Ticket[]

    @ManyToOne(() => Destination, dest => dest.destination)
    @JoinColumn({ name: "destination_id"})
    destination!: Destination

    @ManyToOne(() => Destination, dest => dest.start)
    @JoinColumn({ name: "start_id"})
    start!: Destination
    

    @ManyToOne(() => Plane, plane => plane.flights)
    @JoinColumn({ name: "plane_id" })
    plane!: Plane
}