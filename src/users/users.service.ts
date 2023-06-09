import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService { // generic type of User

  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({email,password})

    return this.repo.save(user)
  }


  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id });
  }


  find(email: string) {
    return this.repo.find({ where: { email } });
  }


  async update( id: number, attrs: Partial<User>) {
    const user = await this.findOne(id)

    if (!user) {
      throw new NotFoundException("user not found");
    }
    Object.assign(user, attrs) // This will take all take all elements of attrs and assing to user
    return this.repo.save(user)
  }


  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException("user not found")
    }

    return this.repo.remove(user);
  }
}
