import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('country') // The table name
export class Country {
    @PrimaryGeneratedColumn('uuid') // Generated as UUID in the database
    Countryid?: string

    @Column({unique: true})
    Name?: string
    
    @Column('text')
    Abbreviation?: string
}