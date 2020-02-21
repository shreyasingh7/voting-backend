import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { Transaction, Withdrawal, Register } from './payment.types'
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
    @Column({ unique: true })
    address: string
    @Column({ unique: true })
    password: string
    @Column({ unique: true })
    voterId: string
    @Column()
    status: boolean
}

@Entity()
export class Transactions extends CreatedModified implements Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    waxUsername: string

    @Column()
    paypalEmail: string

    @Column()
    currentTime: string

    @Column()
    dueTime: string

    @Column()
    transactionAmount: string

    @Column()
    paymentId: string
}

@Entity()
export class Withdrawals extends CreatedModified implements Withdrawal {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    waxUsername: string

    @Column()
    paypalEmail: string

    @Column()
    currentTime: string

    @Column()
    dueTime: string

    @Column()
    withdrawalAmount: string
}
