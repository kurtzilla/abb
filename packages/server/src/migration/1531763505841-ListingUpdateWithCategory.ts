import {MigrationInterface, QueryRunner} from "typeorm";

export class listingUpdateWithCategory1531763505841 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TYPE "mailq_status_enum" RENAME TO "mailq_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "mailq_status_enum" AS ENUM('Queued', 'Sent', 'Error', 'OnHold', '0', '1', '2', '3')`);
        await queryRunner.query(`ALTER TABLE "mailq" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "mailq" ALTER COLUMN "status" TYPE "mailq_status_enum" USING "status"::"text"::"mailq_status_enum"`);
        await queryRunner.query(`ALTER TABLE "mailq" ALTER COLUMN "status" SET DEFAULT 'Queued'`);
        await queryRunner.query(`DROP TYPE "mailq_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE "mailq_status_enum_old" AS ENUM('Queued', 'Sent', 'Error', 'OnHold', '0', '1', '2', '3')`);
        await queryRunner.query(`ALTER TABLE "mailq" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "mailq" ALTER COLUMN "status" TYPE "mailq_status_enum_old" USING "status"::"text"::"mailq_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "mailq" ALTER COLUMN "status" SET DEFAULT 'Queued'`);
        await queryRunner.query(`DROP TYPE "mailq_status_enum"`);
        await queryRunner.query(`ALTER TYPE "mailq_status_enum_old" RENAME TO "mailq_status_enum"`);
    }

}
