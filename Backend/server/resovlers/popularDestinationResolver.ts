import { Guid } from 'guid-typescript'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { getMongoManager, MongoEntityManager, ObjectID } from 'typeorm'
import { PopularDestination } from '../entitiesMongo/popularDestination'

@Resolver()
export class PopularDestinationResolver {
  manager: MongoEntityManager = getMongoManager('mongodb')

  @Query(() => [PopularDestination], { nullable: true })
  async getDestinations(): Promise<PopularDestination[]> {
    return await this.manager.find<PopularDestination>(PopularDestination)
  }

  @Query(() => PopularDestination, { nullable: true })
  async getDestinationById(
    @Arg('destinationId') destinationId: string,
  ): Promise<PopularDestination | undefined | null> {
    return await this.manager.findOne<PopularDestination>(
      PopularDestination,
      destinationId,
    )
  }

  @Query(() => PopularDestination, { nullable: true })
  async getDestinationByName(
    @Arg('name') name: string,
  ): Promise<PopularDestination | undefined | null> {
    console.log(name)
    return await this.manager.findOne<PopularDestination>(
      PopularDestination,
      name,
    )
  }

  @Mutation(() => PopularDestination, { nullable: true })
  async createPopularDestination(
    @Arg('data') newPopularDestinationEntityData: PopularDestination,
  ): Promise<PopularDestination> {
    console.log(newPopularDestinationEntityData)
    const result: PopularDestination = await this.manager.create(
      PopularDestination,
      newPopularDestinationEntityData,
    )
    this.manager.save(result)
    return result
  }
}
