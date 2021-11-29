import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { getMongoManager, MongoEntityManager, ObjectID } from 'typeorm'
import { PopularDestination } from '../entities/popularDestination'

@Resolver()
export class PopularDestinationResolver {
  manager: MongoEntityManager = getMongoManager('mongodb')

  @Query(() => [PopularDestination], { nullable: true })
  async getDestinations(): Promise<PopularDestination[]> {
    return await this.manager.find<PopularDestination>(PopularDestination)
  }

  @Query(() => PopularDestination, { nullable: true })
  async getDestinationById(
    @Arg('id') id: string,
  ): Promise<PopularDestination | undefined | null> {
    return await this.manager.findOne<PopularDestination>(
      PopularDestination,
      id,
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
