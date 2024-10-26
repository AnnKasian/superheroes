import { type MigrationInterface, type QueryRunner } from "typeorm";

class InitialMigration1729961920310 implements MigrationInterface {
  name = "InitialMigration1729961920310";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "superheroes-powers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_14880f531f7b2e9d81078207452" UNIQUE ("name"), CONSTRAINT "PK_fcc28205bd80167b1edc604ed94" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_14880f531f7b2e9d8107820745" ON "superheroes-powers" ("name") ',
    );
    await queryRunner.query(
      'CREATE TABLE "superheroes-images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "superhero_id" uuid, "image_path" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f30d06cc7941b732e0f7c409b01" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "superheroes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nickname" character varying(100) NOT NULL, "real_name" character varying(100) NOT NULL, "origin_description" text NOT NULL, "catch_phrase" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_259e1a95fbc1a77824385dd70db" UNIQUE ("nickname"), CONSTRAINT "PK_6aede08a2d7747d1aaa7f438b30" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_259e1a95fbc1a77824385dd70d" ON "superheroes" ("nickname") ',
    );
    await queryRunner.query(
      'CREATE TABLE "superheroes_superpowers" ("superheroesId" uuid NOT NULL, "superheroesPowersId" uuid NOT NULL, CONSTRAINT "PK_e6746c92009ab38cc78d83e5eca" PRIMARY KEY ("superheroesId", "superheroesPowersId"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_7fb467dda9bca5c334a1e1e327" ON "superheroes_superpowers" ("superheroesId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_b9666b6ca3aa395fd4c575bf85" ON "superheroes_superpowers" ("superheroesPowersId") ',
    );
    await queryRunner.query(
      'ALTER TABLE "superheroes-images" ADD CONSTRAINT "FK_ce2aa0fc113d9b53358583ded56" FOREIGN KEY ("superhero_id") REFERENCES "superheroes"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "superheroes_superpowers" ADD CONSTRAINT "FK_7fb467dda9bca5c334a1e1e3279" FOREIGN KEY ("superheroesId") REFERENCES "superheroes"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "superheroes_superpowers" ADD CONSTRAINT "FK_b9666b6ca3aa395fd4c575bf858" FOREIGN KEY ("superheroesPowersId") REFERENCES "superheroes-powers"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "superheroes_superpowers" DROP CONSTRAINT "FK_b9666b6ca3aa395fd4c575bf858"',
    );
    await queryRunner.query(
      'ALTER TABLE "superheroes_superpowers" DROP CONSTRAINT "FK_7fb467dda9bca5c334a1e1e3279"',
    );
    await queryRunner.query(
      'ALTER TABLE "superheroes-images" DROP CONSTRAINT "FK_ce2aa0fc113d9b53358583ded56"',
    );
    await queryRunner.query(
      'DROP INDEX "public"."IDX_b9666b6ca3aa395fd4c575bf85"',
    );
    await queryRunner.query(
      'DROP INDEX "public"."IDX_7fb467dda9bca5c334a1e1e327"',
    );
    await queryRunner.query('DROP TABLE "superheroes_superpowers"');
    await queryRunner.query(
      'DROP INDEX "public"."IDX_259e1a95fbc1a77824385dd70d"',
    );
    await queryRunner.query('DROP TABLE "superheroes"');
    await queryRunner.query('DROP TABLE "superheroes-images"');
    await queryRunner.query(
      'DROP INDEX "public"."IDX_14880f531f7b2e9d8107820745"',
    );
    await queryRunner.query('DROP TABLE "superheroes-powers"');
  }
}

export { InitialMigration1729961920310 };
