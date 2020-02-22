import { EntityRepository, Repository, QueryBuilder, Connection, getRepository } from 'typeorm'
import { Users, Votings } from './payment.entity'
import { getSingleBy, getManyBy } from '../../helpers'
import { UpdatePasswordDto } from './payment.dto'
import { Query } from '@nestjs/common'

export const getUserBy = getSingleBy(Users)

export const getVotingBy = getSingleBy(Votings)

export const getVotingsBy = getManyBy(Votings)

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

export async function getCount() {
    const sql = `
  SELECT count(*) FROM "votings"
  where vote = 'BJP'
    `
    const result = await Query(sql)
    return result[0].count
}

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
