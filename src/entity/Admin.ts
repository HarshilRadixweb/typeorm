import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  first_name: string;

  @Column({
    nullable: true,
  })
  last_name: string;

  @Column()
  email: string;
}
