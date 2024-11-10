import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class Users extends BaseEntity {
    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    password: string

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: true })
    organization: string

}