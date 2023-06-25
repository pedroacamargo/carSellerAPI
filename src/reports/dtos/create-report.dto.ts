import { 
    IsNumber,
    IsString,
    Min,
    Max,
    IsLongitude,
    IsLatitude,
    
} from "class-validator";

export class CreateReportDto {
    @IsNumber()
    @Min(0)
    @Max(1000000)
    price: number;

    @IsNumber()
    @Min(1930)
    @Max(2050)
    year: number;

    @IsNumber()
    @IsLongitude()
    lng: number;

    @IsNumber()
    @IsLatitude()
    lat: number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;

    @IsString()
    make: string;

    @IsString()
    model: string;
}