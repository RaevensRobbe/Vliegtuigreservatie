export default interface Dest{
    DestinationId: string,
    Name: string,
    Popularity: number,
    Picture:string,
}

export default interface PopularDestination {
    Name: string;
    Dest: Dest;
}