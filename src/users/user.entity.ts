import { AfterInsert, BeforeRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

// All these things are decorators

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log("Inserted User with id ", this.id)
  }

  @AfterUpdate()
  logUpdate() {
    console.log("Updated User with id ", this.id)
  }

  @BeforeRemove()
  logRemove() {
    console.log("Removed user with id ", this.id)
  }
}
