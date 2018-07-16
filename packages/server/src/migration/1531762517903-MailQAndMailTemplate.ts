import {MigrationInterface, QueryRunner} from "typeorm";

export class mailQAndMailTemplate1531762517903 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "mailTemplate" ("id" SERIAL NOT NULL, "mailTemplateId" uuid NOT NULL DEFAULT uuid_generate_v4(), "dtStamp" TIMESTAMP NOT NULL DEFAULT now(), "paramNames" text array, "mailBody" text, CONSTRAINT "PK_2140e3642fd64282ebeea6e9e5f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mailq" ("id" SERIAL NOT NULL, "mailqId" uuid NOT NULL DEFAULT uuid_generate_v4(), "dtStamp" TIMESTAMP NOT NULL DEFAULT now(), "threadlock" character varying(100), "priority" integer NOT NULL DEFAULT 0, "dtToProcess" TIMESTAMP NOT NULL, "dtProcessed" TIMESTAMP, "attemptsRemaining" integer NOT NULL DEFAULT 3, "status" "mailq_status_enum" NOT NULL DEFAULT 'Queued', "fromName" character varying(255), "fromAddress" character varying(255) NOT NULL, "toAddress" character varying(255) NOT NULL, "paramValues" text array, "mailBody" text, "mailTemplateId" integer NOT NULL, CONSTRAINT "REL_3b59afd43c25a0433ad91f3a0a" UNIQUE ("mailTemplateId"), CONSTRAINT "PK_c77b46441f0c3eae9019aaa3aee" PRIMARY KEY ("id", "mailqId"))`);
        await queryRunner.query(`ALTER TABLE "mailq" ADD CONSTRAINT "FK_3b59afd43c25a0433ad91f3a0a6" FOREIGN KEY ("mailTemplateId") REFERENCES "mailTemplate"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "mailq" DROP CONSTRAINT "FK_3b59afd43c25a0433ad91f3a0a6"`);
        await queryRunner.query(`DROP TABLE "mailq"`);
        await queryRunner.query(`DROP TABLE "mailTemplate"`);
    }

}
