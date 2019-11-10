import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Length, IsDate, IsNotEmpty, IsOptional } from 'class-validator';

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
    @IsNotEmpty()
    findings: object;

    @CreateDateColumn()
    queuedAt: Date;

    @Column({ nullable: true })
    @IsDate()
    @IsOptional()
    scanningAt: Date;

    @Column({ nullable: true })
    @IsDate()
    @IsOptional()
    finishedAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
export default Result;

// SCHEMA
const findingsExample = [{
    "type": "sast",
    "ruleId": "G402",
    "location": {
        "path": "connectors/apigateway.go",
        "positions": {
            "begin": {
                "line": 60
            }
        }
    },
    "metadata": {
        "description": "TLS InsecureSkipVerify set true.",
        "severity": "HIGH"
    }
}];
const exampleDate = new Date();

export const resultSchema = {
    id: { type: 'number', required: true, example: 1 },
    status: { type: 'string', required: false, example: 'Queued' },
    repositoryName: { type: 'string', required: true, example: 'my repository' },
    findings: { type: 'jsonb', required: true, example: findingsExample },
    queuedAt: { type: 'date', required: false, example: exampleDate },
    scanningAt: { type: 'date', required: false, example: exampleDate },
    finishedAt: { type: 'date', required: false, example: exampleDate },
    updatedAt: { type: 'date', required: false, example: exampleDate },
};