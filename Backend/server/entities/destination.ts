import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { Point } from "geojson"
import { Country } from "./country"
import { Flight } from "./flight"

@Entity('destination') // The table name
export class Destination {

    @PrimaryColumn({unique: true})
    DestinationId?: number

    @Column({unique: true})
    Name?: string

    @Column()
    Popularity?: string

    @Column()
    Abbreviation?: string
    
    @Column()
    Picture?: string

    @Column({ type: 'simple-json' })
    Coordinates?: Point

    @ManyToOne(() => Country)
    @JoinColumn( {name: "country_id"})
    Country?: Country

    @OneToMany(() => Flight, flight => flight.Destination)
    Destination?: Flight[]

    @OneToMany(() => Flight, flight => flight.Start)
    Start?: Flight[]
}