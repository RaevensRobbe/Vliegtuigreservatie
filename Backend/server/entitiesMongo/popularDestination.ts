import { Field, ID, InputType, Int, ObjectType } from 'type-graphql'
import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'

@ObjectType()
@InputType('PopularDestinationInput')
@Entity('PopularDestination')
export class PopularDestination extends BaseEntity {
  @Field(() => ID, { nullable: true }) //Field decorator, represent a Graphql field of our graphql object type
  @ObjectIdColumn() //Special decorator, to tell that this collumn represent an unique generated ID
  destinationId?: ObjectID

  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  intro: string

  @Field({ nullable: true })
  @Column()
  summary?: string
}
