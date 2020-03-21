import { ObjectType, EntitySchema, getRepository, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { JsonRpc, Api } from 'eosjs'
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'
import fetch from 'node-fetch'
import { TextDecoder, TextEncoder } from 'util'

export const array = [
    {
        state: 'Andaman and Nicobar Islands',
        abbreviation: 'AN',
        date: '2020/3/21'
    },
    {
        state: 'Andhra Pradesh',
        abbreviation: 'AP',
        date: '2020/3/21'
    },
    {
        state: 'Arunachal Pradesh',
        abbreviation: 'AR',
        date: '2020/4/7'
    },
    {
        state: 'Assam',
        abbreviation: 'AS',
        date: '2020/4/8'
    },
    {
        state: 'Bihar',
        abbreviation: 'BR',
        date: '2020/4/9'
    },
    {
        state: 'Chandigarh',
        abbreviation: 'CH',
        date: '2020/4/10'
    },
    {
        state: 'Chhattisgarh',
        abbreviation: 'CT',
        date: '2020/4/11'
    },
    {
        state: 'Dadra and Nagar Haveli',
        abbreviation: 'DN',
        date: '2020/4/12'
    },
    {
        state: 'Daman and Diu',
        abbreviation: 'DD',
        date: '2020/4/13'
    },
    {
        state: 'Delhi',
        abbreviation: 'DL',
        date: '2020/4/14'
    },
    {
        state: 'Goa',
        abbreviation: 'GA',
        date: '2020/4/15'
    },
    {
        state: 'Gujarat',
        abbreviation: 'GJ',
        date: '2020/4/16'
    },
    {
        state: 'Haryana',
        abbreviation: 'HR',
        date: '2020/4/17'
    },
    {
        state: 'Himachal Pradesh',
        abbreviation: 'HP',
        date: '2020/4/18'
    },
    {
        state: 'Jammu and Kashmir',
        abbreviation: 'JK',
        date: '2020/4/19'
    },
    {
        state: 'Jharkhand',
        abbreviation: 'JH',
        date: '2020/4/20'
    },
    {
        state: 'Karnataka',
        abbreviation: 'KA',
        date: '2020/4/21'
    },
    {
        state: 'Kerala',
        abbreviation: 'KL',
        date: '2020/4/22'
    },
    {
        state: 'Lakshadweep',
        abbreviation: 'LD',
        date: '2020/4/23'
    },
    {
        state: 'Madhya Pradesh',
        abbreviation: 'MP',
        date: '2020/4/24'
    },
    {
        state: 'Maharashtra',
        abbreviation: 'MH',
        date: '2020/4/25'
    },
    {
        state: 'Manipur',
        abbreviation: 'MN',
        date: '2020/4/26'
    },
    {
        state: 'Meghalaya',
        abbreviation: 'ML',
        date: '2020/4/27'
    },
    {
        state: 'Mizoram',
        abbreviation: 'MZ',
        date: '2020/4/28'
    },
    {
        state: 'Nagaland',
        abbreviation: 'NL',
        date: '2020/4/29'
    },
    {
        state: 'Odisha',
        abbreviation: 'OR',
        date: '2020/4/30'
    },
    {
        state: 'Puducherry',
        abbreviation: 'PY',
        date: '2020/5/1'
    },
    {
        state: 'Punjab',
        abbreviation: 'PB',
        date: '2020/5/2'
    },

    {
        state: 'Rajasthan',
        abbreviation: 'RJ',
        date: '2020/5/3'
    },

    {
        state: 'Sikkim',
        abbreviation: 'SK',
        date: '2020/5/4'
    },

    {
        state: 'Tamil Nadu',
        abbreviation: 'TN',
        date: '2020/5/5'
    },
    {
        state: 'Telangana',
        abbreviation: 'TG',
        date: '2020/5/6'
    },
    {
        state: 'Tripura',
        abbreviation: 'TR',
        date: '2020/5/7'
    },
    {
        state: 'Uttar Pradesh',
        abbreviation: 'UP',
        date: '2020/5/8'
    },
    {
        state: 'Uttarakhand',
        abbreviation: 'UT',
        date: '2020/5/9'
    },
    {
        state: 'West Bengal',
        abbreviation: 'WB',
        date: '2020/5/10'
    }

]
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

export abstract class CreatedModified {
    @CreateDateColumn()
    created!: Date

    @UpdateDateColumn()
    modified!: Date
  }
