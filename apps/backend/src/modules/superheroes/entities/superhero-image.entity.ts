import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { SuperheroEntity } from "./superhero.entity";

@Entity("superheroes-images")
class SuperheroImageEntity {
  constructor(entity?: Partial<SuperheroImageEntity>) {
    Object.assign(this, entity);
  }

  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Column({ name: "superhero_id", nullable: true })
  public superheroId!: string;

  @Column({ type: "text", name: "image_path" })
  public imagePath!: string;

  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  public createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
  public updatedAt!: Date;

  @JoinColumn({ name: "superhero_id" })
  @ManyToOne("SuperheroEntity", "images", { onDelete: "CASCADE" })
  public superhero!: null | SuperheroEntity;
}

export { SuperheroImageEntity };
