import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import { Destination } from "./destination"
import { Plane } from "./plane"
import { Ticket } from "./ticket"

@Entity('flight') // The table name
export class Flight {
    @PrimaryGeneratedColumn('uuid')
    FlightId?: string

    @Column({unique: true})
    Name?: string

    @Column('datetime')
    Date?: string

    @Column('double')
    Price?: number

    @Column('int')
    Gate?: number

    @OneToMany(() => Ticket, ticket => ticket.Flight)
    Ticket!: Ticket[]

    @Column({ name: 'destinationId' })
    DestinationId?: string;

    @ManyToOne(() => Destination)
    @JoinColumn({ name: "destinationId"})
    Destination?: Destination

    @Column({ name: 'startId' })
    StartId?: string;

    @ManyToOne(() => Destination)
    @JoinColumn({ name: "startId"})
    Start?: Destination

    @Column({ name: 'planeId' })
    PlaneId?: string;
    
    @ManyToOne(() => Plane)
    @JoinColumn({ name: "planeId" })
    Plane?: Plane
}