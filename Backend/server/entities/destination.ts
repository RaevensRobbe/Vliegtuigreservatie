import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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
}