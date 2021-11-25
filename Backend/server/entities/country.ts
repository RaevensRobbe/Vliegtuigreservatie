import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Destination } from "./destination"

@Entity('country')
export class Country{
    @PrimaryGeneratedColumn('uuid')
    CountryId?: string

    @Column({unique: true})
    Name?: string

    @OneToMany(() => Destination, dest => dest.Country)
    Dest?: Destination[]
}