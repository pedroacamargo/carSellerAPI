import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    const user = await this.usersService.find(email);

    if(user.length) {
      throw new BadRequestException("email already in use");
    }


    // Hashing the users password 
  }

  signin() {

  }
}