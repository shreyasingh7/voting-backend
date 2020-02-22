import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import {  Register, Voting } from './payment.types'
import { CreatedModified } from '../../helpers'

@Entity()
export class Users extends CreatedModified implements Register {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column({ unique: true })
    name: string
    @Column({ unique: true })
    email: string
    @Column({ unique: true })
    adharId: string
    @Column()
    state: string
    @Column()
    gender: string
    @Column()
    contactNumber: string
    @Column({ nullable: true })
    password: string
    @Column({ unique: true })
    voterId: string
    @Column()
    status: boolean
}

@Entity()
export class Votings extends CreatedModified implements Voting {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    voterId: string

    @Column()
    vote: string

    @Column()
    state: string

}