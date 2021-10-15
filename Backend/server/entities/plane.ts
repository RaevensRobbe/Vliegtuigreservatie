import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('plane') // The table name
export class Plane {
    @PrimaryGeneratedColumn('uuid') // Generated as UUID in the database
    Planeid?: string

    @Column({unique: true})
    Name?: string

    @Column()
    Type?: string
    
    @Column('int')
    businessSeats?: number

    @Column('int')
    firstClassSeats?: number
}