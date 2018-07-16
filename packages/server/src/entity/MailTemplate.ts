import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Generated
} from 'typeorm';

@Entity('mailTemplate')
export class MailTemplate extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column()
  @Generated('uuid')
  mailTemplateId: string;

  @CreateDateColumn() dtStamp: Date;

  @Column('text', { array: true, nullable: true })
  paramNames: string[];

  @Column('text', { nullable: true })
  mailBody: string;
}
