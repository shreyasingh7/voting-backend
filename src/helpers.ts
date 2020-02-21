import { ObjectType, EntitySchema, getRepository, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { JsonRpc, Api } from 'eosjs'
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'
import fetch from 'node-fetch'
import { TextDecoder, TextEncoder } from 'util'

export function getSingleBy<T = any>(
    table: ObjectType<T> | EntitySchema<T>
): (filter: Partial<T>) => Promise<T> {
    return async (filter) => {
        const record = await getRepository(table).findOne({ where: filter })
        return record
    }
}

export function getManyBy<T = any>(
    table: ObjectType<T> | EntitySchema<T>
): (filter: Partial<T>) => Promise<T[]> {
    return async (filter) => {
        const result = await getRepository(table).find({ where: filter })
        return result
    }
}

export function getTime() {
    const days = 30
    const date = new Date()
    const current = date.setDate(date.getDate())
    const newDate = date.setDate(date.getDate() + days)
    return {
        current: JSON.stringify(current),
        newDate: JSON.stringify(newDate)
    }
}

export const transaction = async (waxUsername, creditAmount, privateKey) => {
    const signatureProvider = new JsSignatureProvider([privateKey])
    const rpc = new JsonRpc(process.env.CONTRACT_URL, { fetch })
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() })
    try {
        return await api.transact({
            actions: [{
                account: process.env.CONTRACT_ACCOUNT,
                name: process.env.TRANSACTION_ACTION,
                authorization: [{
                    actor: process.env.CONTRACT_ACTOR,
                    permission: process.env.TRANSACTION_PERMISSION,
                }],
                data: {
                    username: process.env.CONTRACT_NAME,
                    sponsor: waxUsername,
                    cointype: process.env.TRANSACTION_COINTYPE,
                    creditamount: creditAmount ? creditAmount : process.env.DEFAULT_CREDIT_AMOUNT,
                },
            }]
        }, {
            blocksBehind: parseInt(process.env.TRANSACTION_BLOCK_BEHIND),
            expireSeconds: parseInt(process.env.TRANSACTION_EXPIRE_SECONDS),
        })
    } catch (err) {
        throw err
    }
}

export abstract class CreatedModified {
    @CreateDateColumn()
    created!: Date

    @UpdateDateColumn()
    modified!: Date
  }
