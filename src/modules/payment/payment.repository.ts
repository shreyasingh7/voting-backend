import { EntityRepository, Repository, QueryBuilder, Connection, getRepository } from 'typeorm'
import { Withdrawals, Users, Transactions } from './payment.entity'
import { getSingleBy, getManyBy } from '../../helpers'
import { Withdrawal, Transaction } from './payment.types'

export const getUserBy = getSingleBy(Users)

export const getTransactionBy = getSingleBy(Transactions)

export const getWithdrawalBy = getSingleBy(Withdrawals)

export const getWithdrawalsBy = getManyBy(Withdrawals)

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
    // async insertUser(user: User) {
    //     await getRepository(Users).insert(user)
    // }
}

@EntityRepository(Transactions)
export class TransactionRepository extends Repository<Transactions> {

    async getTransactionByTime(paypalEmail) {
        const result = await getRepository(Transactions)
            .createQueryBuilder('transaction')
            .where('transaction.paypalEmail = :paypalEmail', { paypalEmail })
            .orderBy('transaction.currentTime', 'DESC')
            .limit(1)
            .getOne()
        return result
    }

    async insertTransaction(transaction: Transaction) {
        await getRepository(Transactions).insert(transaction)
    }
}

@EntityRepository(Withdrawals)
export class WithdrawalRepository extends Repository<Withdrawals> {

    async insertWithdrawal(withdrawal: Withdrawal) {
        await getRepository(Withdrawals).insert(withdrawal)
    }
}
