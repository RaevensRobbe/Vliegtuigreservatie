import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('user') // The table name
export class User {
    @PrimaryGeneratedColumn('uuid') // Generated as UUID in the database
    Userid?: string

    @Column({length: 30})
    Name?: string

    @Column({length: 30})
    SurName?: string

    @Column('int')
    Age?: number
    
    @Column({length: 100})
    Emails?: string

    @Column({length: 50})
    Sex?: string
    
    @Column()
    Admin?: boolean

}