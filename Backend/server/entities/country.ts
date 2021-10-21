import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { Destination } from "./destination"

@Entity('country')
export class Country{
    @PrimaryColumn({unique: true})
    CountryId?: number

    @Column({unique: true})
    Name?: string

    @OneToMany(() => Destination, dest => dest.Country)
    Dest?: Destination[]
}