import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
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
    Picture?: string

    @ManyToOne(() => Country , country => country.dest)
    @JoinColumn( {name: "country_id"})
    country!: Country

    @OneToMany(() => Flight, flight => flight.destination)
    destination!: Flight[]

    @OneToMany(() => Flight, flight => flight.start)
    start!: Flight[]
}