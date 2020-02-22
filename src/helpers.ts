import { ObjectType, EntitySchema, getRepository, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { JsonRpc, Api } from 'eosjs'
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'
import fetch from 'node-fetch'
import { TextDecoder, TextEncoder } from 'util'

export const array = [
    {
        state: 'Andaman and Nicobar Islands',
        abbreviation: 'AN',
        date: '2020/2/22'
    },
    {
        state: 'Andhra Pradesh',
        abbreviation: 'AP',
        date: '2020/2/23'
    },
    {
        state: 'Arunachal Pradesh',
        abbreviation: 'AR',
        date: '2020/2/24'
    },
    {
        state: 'Assam',
        abbreviation: 'AS',
        date: '2020/2/25'
    },
    {
        state: 'Bihar',
        abbreviation: '	BR',
        date: '2020/2/26'
    },
    {
        state: 'Chandigarh',
        abbreviation: 'CH',
        date: '2020/2/27'
    },
    {
        state: 'Chhattisgarh',
        abbreviation: 'CT',
        date: '2020/2/28'
    },
    {
        state: 'Dadra and Nagar Haveli',
        abbreviation: 'DN',
        date: '2020/2/29'
    },
    {
        state: 'Daman and Diu',
        abbreviation: 'DD',
        date: '2020/3/01'
    },
    {
        state: 'Delhi',
        abbreviation: 'DL',
        date: '2020/3/02'
    },
    {
        state: 'Goa',
        abbreviation: 'GA',
        date: '2020/3/03'
    },
    {
        state: 'Gujarat',
        abbreviation: 'GJ',
        date: '2020/3/04'
    },
    {
        state: 'Haryana',
        abbreviation: 'HR',
        date: '2020/3/05'
    },
    {
        state: 'Himachal Pradesh',
        abbreviation: 'HP',
        date: '2020/3/06'
    },
    {
        state: 'Jammu and Kashmir',
        abbreviation: 'JK',
        date: '2020/3/07'
    },
    {
        state: 'Jharkhand',
        abbreviation: 'JH',
        date: '2020/3/08'
    },
    {
        state: 'Karnataka',
        abbreviation: 'KA',
        date: '2020/3/09'
    },
    {
        state: 'Kerala',
        abbreviation: 'KL',
        date: '2020/3/10'
    },
    {
        state: 'Lakshadweep',
        abbreviation: 'LD',
        date: '2020/3/11'
    },
    {
        state: 'Madhya Pradesh',
        abbreviation: 'MP',
        date: '2020/3/12'
    },
    {
        state: 'Maharashtra',
        abbreviation: '	MH',
        date: '2020/3/13'
    },
    {
        state: 'Manipur',
        abbreviation: 'MN',
        date: '2020/3/10'
    },
    {
        state: 'Meghalaya',
        abbreviation: 'ML',
        date: '2020/3/15'
    },
    {
        state: 'Mizoram',
        abbreviation: '	MZ',
        date: '2020/3/16'
    },
    {
        state: 'Nagaland',
        abbreviation: 'NL',
        date: '2020/3/17'
    },
    {
        state: 'Odisha',
        abbreviation: 'OR',
        date: '2020/3/18'
    },
    {
        state: 'Puducherry',
        abbreviation: '	PY',
        date: '2020/3/19'
    },
    {
        state: 'Punjab',
        abbreviation: 'PB',
        date: '2020/3/20'
    },

    {
        state: 'Rajasthan',
        abbreviation: 'RJ',
        date: '2020/3/21'
    },

    {
        state: 'Sikkim',
        abbreviation: 'SK',
        date: '2020/3/22'
    },

    {
        state: 'Tamil Nadu',
        abbreviation: 'TN',
        date: '2020/3/23'
    },
    {
        state: 'Telangana',
        abbreviation: 'TG',
        date: '2020/3/24'
    },
    {
        state: 'Tripura',
        abbreviation: 'TR',
        date: '2020/3/25'
    },
    {
        state: 'Uttar Pradesh',
        abbreviation: 'UP',
        date: '2020/3/26'
    },
    {
        state: 'Uttarakhand',
        abbreviation: 'UT',
        date: '2020/3/27'
    },
    {
        state: 'West Bengal',
        abbreviation: 'WB',
        date: '2020/3/28'
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
