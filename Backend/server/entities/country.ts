import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Destination } from "./destination"

@Entity('country')
export class Country{
    @PrimaryGeneratedColumn('uuid') // Generated as UUID in the database
    uuid?: string

    @Column({unique: true})
    CountryId?: number

    @Column({unique: true})
    Name?: string

    @OneToMany(() => Destination, dest => dest.Country)
    Dest!: Destination[]
}