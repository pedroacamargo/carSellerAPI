import { Expose, Transform } from "class-transformer";
import { User } from "src/users/user.entity";

export class reportDto {
    @Expose()
    id:number;

    @Expose()
    price:number;

    @Expose()
    year: number;

    @Expose()
    lng: number;

    @Expose()
    lat: number;

    @Expose()
    make: string;

    @Expose()
    model: string;

    @Expose()
    mileage: number;

    @Transform(({ obj }) => obj.user.id) // This will take the original report entity, look at its user property and look at that users ID
    @Expose()
    userId: number;
}