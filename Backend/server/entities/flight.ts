import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn} from "typeorm"
import { Destination } from "./destination"
import { Plane } from "./plane"
import { Ticket } from "./ticket"

@Entity('flight') // The table name
export class Flight {
    @PrimaryColumn({unique: true})
    FlightId?: number

    @Column('datetime')
    Date?: string

    @Column('double')
    Price?: number

    @Column('int')
    Gate?: number

    @OneToMany(() => Ticket, ticket => ticket.Flight)
    Ticket!: Ticket[]

    @ManyToOne(() => Destination)
    @JoinColumn({ name: "destination_id"})
    Destination?: Destination

    @ManyToOne(() => Destination)
    @JoinColumn({ name: "start_id"})
    Start?: Destination
    
    @ManyToOne(() => Plane)
    @JoinColumn({ name: "plane_id" })
    Plane?: Plane
}