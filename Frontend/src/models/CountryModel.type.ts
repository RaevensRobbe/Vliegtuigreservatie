import type Dest from './DestinationModel.type'

export default interface Country {
  CountryId: string
  Name: string
  Dest: Dest[]
}
