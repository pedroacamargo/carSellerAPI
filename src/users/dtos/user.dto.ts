import { Expose, Exclude } from "class-transformer";
// exclude is the anthonym of expose

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}