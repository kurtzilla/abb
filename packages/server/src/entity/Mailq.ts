import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { Statii } from '../enums';
import { MailTemplate } from './MailTemplate';

/*
CC
BCC
*/

@Entity('mailq')
export class Mailq extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @PrimaryGeneratedColumn('uuid') mailqId: string;
  @CreateDateColumn() dtStamp: Date;

  @Column('varchar', { length: 100, nullable: true })
  threadlock: string;
  @Column('int', { default: 0 })
  priority: number;

  @Column('timestamp', { nullable: false })
  dtToProcess: Date;
  @Column('timestamp', { nullable: true })
  dtProcessed: Date;
  @Column('int', { default: 3 })
  attemptsRemaining: number;

  @Column('enum', { enum: Statii, default: Statii[Statii.Queued] })
  status: string;

  @Column('varchar', { length: 255, nullable: true })
  fromName: string;
  @Column('varchar', { length: 255, nullable: false })
  fromAddress: string;
  @Column('varchar', { length: 255, nullable: false })
  toAddress: string;

  @Column('text', { array: true, nullable: true })
  paramValues: string[];

  @Column('text', { nullable: true })
  mailBody: string;

  @Column('int') mailTemplateId: number;
  @OneToOne(() => MailTemplate)
  @JoinColumn({ name: 'mailTemplateId' })
  mailTemplate: MailTemplate | null;
}
