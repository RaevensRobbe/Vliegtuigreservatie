import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Point } from "geojson"
import { Country } from "./country"
import { Flight } from "./flight"

@Entity('destination') // The table name
export class Destination {
    @PrimaryGeneratedColumn('uuid') // Generated as UUID in the database
    Destinationid?: string

    @Column({unique: true})
    Name?: string

    @Column()
    Populairity?: string

    @Column()
    Abbreviation?: string
    
    @Column()
    Picture?: string

    @Column({ type: 'simple-json' })
    Coordinates?: Point

    @ManyToOne(() => Country , country => country.Dest)
    @JoinColumn( {name: "country_id"})
    Country!: Country

    @OneToMany(() => Flight, flight => flight.Destination)
    Destination!: Flight[]

    @OneToMany(() => Flight, flight => flight.Start)
    Start!: Flight[]
}