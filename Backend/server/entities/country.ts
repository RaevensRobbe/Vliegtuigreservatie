import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Destination } from "./destination"

@Entity('country')
export class Country{
    @PrimaryGeneratedColumn('uuid') // Generated as UUID in the database
    Countryid?: string

    @Column({unique: true})
    Name?: string
    
    @Column('text')
    Abbreviation?: string

    @OneToMany(() => Destination, dest => dest.Country)
    Dest!: Destination[]
}