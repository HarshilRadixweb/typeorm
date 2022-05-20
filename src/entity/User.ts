import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  user_name: string;

  @Column({
    nullable: true,
  })
  password: string;

  @Column()
  role: string;

  @Column()
  email: string;
}
