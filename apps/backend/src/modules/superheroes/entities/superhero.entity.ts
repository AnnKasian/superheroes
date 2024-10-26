import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { SuperheroImageEntity } from "./superhero-image.entity";
import { SuperheroPowerEntity } from "./superpower.entity";

@Entity("superheroes")
class SuperheroEntity {
  constructor(entity?: Partial<SuperheroEntity>) {
    Object.assign(this, entity);
  }

  @ApiProperty()
  @PrimaryGeneratedColumn("uuid")
  public id!: string;

  @Index()
  @Column({ length: 100, unique: true })
  public nickname!: string;

  @Column({ length: 100, name: "real_name" })
  public realName!: string;

  @Column({ type: "text", name: "origin_description" })
  public originDescription!: string;

  @Column({ type: "text", nullable: true, name: "catch_phrase" })
  public catchPhrase!: null | string;

  @ManyToMany("SuperheroPowerEntity", "superheroes", { cascade: true })
  @JoinTable({ name: "superheroes_superpowers" })
  public superpowers!: SuperheroPowerEntity[];

  @OneToMany("SuperheroImageEntity", "superhero", { cascade: true })
  public images!: SuperheroImageEntity[];

  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  public createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
  public updatedAt!: Date;
}

export { SuperheroEntity };
