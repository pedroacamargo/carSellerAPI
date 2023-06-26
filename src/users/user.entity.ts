import { AfterInsert, BeforeRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Report } from "src/reports/report.entity";
// All these things are decorators

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[]

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
