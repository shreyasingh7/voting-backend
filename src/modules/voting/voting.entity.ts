import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import {  Register, Voting, Contact, Count } from './voting.types'
import { CreatedModified } from '../../helpers'

@Entity()
export class Users extends CreatedModified implements Register {
    @PrimaryGeneratedColumn()
    id: string
    @Column()
    name: string
    @Column({ unique: true })
    email: string
    @Column({ unique: true })
    adharId: string
    @Column()
    state: string
    @Column()
    gender: string
    @Column({ unique: true })
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
    @PrimaryGeneratedColumn()
    id: string

    @Column({ unique: true })
    voterId: string

    @Column()
    vote: string

    @Column()
    state: string

}

@Entity()
export class Contacts extends CreatedModified implements Contact {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    from: string

    @Column()
    subject: string

    @Column()
    message: string
}

@Entity()
export class Counts extends CreatedModified implements Count {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    state: string

    @Column()
    BJP: number

    @Column()
    congress: number

    @Column()
    other: number
}
