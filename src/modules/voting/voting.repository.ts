import { EntityRepository, Repository, QueryBuilder, Connection, getRepository } from 'typeorm'
import { Users, Votings, Counts } from './voting.entity'
import { getSingleBy, getManyBy } from '../../helpers'
import { UpdatePasswordDto } from './voting.dto'
import { Query } from '@nestjs/common'

export const getUserBy = getSingleBy(Users)

export const getVotingBy = getSingleBy(Votings)

export const getVotingsBy = getManyBy(Votings)

export const getCountBy = getSingleBy(Counts)

// @EntityRepository(Users)
// export class UserRepository extends Repository<Users> {
//     async updatePassword(user: UpdatePasswordDto) {
//         await getRepository(Users).update(user.password, user)
//     }
// }

// export async function getVotingCountBy() {
//     const sql = `
//     SELECT SUM(voting), COUNT(*)
//   FROM votings
//   GROUP BY
//     address,
//     vote
//     `
//     const result = await Query(sql)
//     return (result)
// }

// export async function getCount() {
//     const sql = `
//   SELECT count(*) FROM "count"
//     `
//     const result = await Query(sql)
//     return result[0].count
// }

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
    // export const updateExerciseShares = async (db: Database, Id: string) => {

    async updatePassword(user: UpdatePasswordDto) {
        const result = await getRepository(Users)
            .createQueryBuilder('user')
            .update(Users)
            .set({ password: user.password })
            .where('email = :email', { email: user.email })
            .execute()
        return result
    }

    async updateStatus(user) {
        const result = await getRepository(Users)
            .createQueryBuilder('user')
            .update(Users)
            .set({ status: true })
            .where('email = :email', { email: user.email })
            .execute()
        return result
    }

}
@EntityRepository(Counts)
export class CountRepository extends Repository<Counts> {
    async updateBJP(count) {
        const val = count.BJP + 1
        const result = await getRepository(Counts)
            .createQueryBuilder('count')
            .update(Counts)
            .set({ BJP: val })
            .where('state = :state', { state: count.state })
            .execute()
        return result
    }

    async updateCongress(count) {
        const val = count.congress + 1
        const result = await getRepository(Counts)
            .createQueryBuilder('count')
            .update(Counts)
            .set({ congress: val })
            .where('state = :state', { state: count.state })
            .execute()
        return result
    }

    async updateOther(count) {
        const val = count.other + 1
        const result = await getRepository(Counts)
            .createQueryBuilder('count')
            .update(Counts)
            .set({ other: val })
            .where('state = :state', { state: count.state })
            .execute()
        return result
    }
}
