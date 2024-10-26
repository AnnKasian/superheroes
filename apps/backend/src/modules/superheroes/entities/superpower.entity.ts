import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { SuperheroEntity } from "./superhero.entity";

@Entity("superheroes-powers")
class SuperheroPowerEntity {
  constructor(entity?: Partial<SuperheroPowerEntity>) {
    Object.assign(this, entity);
  }

  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Index()
  @Column({ length: 100, unique: true })
  public name!: string;

  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  public createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
  public updatedAt!: Date;

  @ManyToMany("SuperheroEntity", "superpowers", { onDelete: "CASCADE" })
  public superheroes!: SuperheroEntity[];
}

export { SuperheroPowerEntity };
