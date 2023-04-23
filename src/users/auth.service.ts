import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto"; // generate salt, hashing function
import { promisify } from "util"; // function that will take a function as callback and it will transform it in a function with promises (user scrypt with promise instead using callback)

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    const users = await this.usersService.find(email);

    if(users.length) {
      throw new BadRequestException("email already in use");
    }

    // Hashing the users password 
    // Generate a  salt
    const salt = randomBytes(8).toString('hex');
    
    // Hash the salt amd the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');

    // Create a new user and save it
    const user = await this.usersService.create(email, result);

    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new NotFoundException("user not found");
    }

    const [salt, storedHash] = user.password.split('.');
    
    const hash = (await scrypt(password,salt,32)) as Buffer;
    
    if (storedHash == hash.toString('hex')) {
      return user;
    } else {
      throw new BadRequestException('bad password')
    }
  }
}