import { Entity, Column, PrimaryGeneratedColumn, VersionColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Length, IsDate, IsJSON, IsNotEmpty, IsOptional } from 'class-validator';

export enum ResultStatus {
    QUEUED = "Queued",
    IN_PROGRESS = "In Progress",
    SUCCESS = "Success",
    FAILURE = "Failure",
}

@Entity()
export class Result {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: ResultStatus, default: ResultStatus.QUEUED })
    status: string;

    @Column({ length: 80 })
    @Length(3, 80)
    @IsNotEmpty()
    repositoryName: string;

    @Column({ type: 'jsonb' })
    @IsJSON()
    @IsNotEmpty()
    findings: object;

    @CreateDateColumn()
    queuedAt: Date;

    @Column()
    @IsDate()
    @IsOptional()
    scanningAt: Date;

    @Column()
    @IsDate()
    @IsOptional()
    finishedAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @VersionColumn()
    entityVersion: number;
}

export const resultSchema = {
    id: { type: 'number', required: true, example: 1 },
    name: { type: 'string', required: true, example: 'Javier' },
    email: { type: 'string', required: true, example: 'avileslopez.javier@gmail.com' }
};