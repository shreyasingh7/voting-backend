import { ObjectType, EntitySchema, getRepository, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import * as moment from 'moment'

export const array = [
    {
        state: 'Andaman and Nicobar Islands',
        abbreviation: 'AN',
        date: moment().add(2, 'days')
    },
    {
        state: 'Andhra Pradesh',
        abbreviation: 'AP',
        date: moment().add(3, 'days')
    },
    {
        state: 'Arunachal Pradesh',
        abbreviation: 'AR',
        date: moment().add(4, 'days')
    },
    {
        state: 'Assam',
        abbreviation: 'AS',
        date: moment().add(5, 'days')
    },
    {
        state: 'Bihar',
        abbreviation: 'BR',
        date: moment().add(6, 'days')
    },
    {
        state: 'Chandigarh',
        abbreviation: 'CH',
        date: moment().add(7, 'days')
    },
    {
        state: 'Chhattisgarh',
        abbreviation: 'CT',
        date: moment().add(8, 'days')
    },
    {
        state: 'Dadra and Nagar Haveli',
        abbreviation: 'DN',
        date: moment().add(9, 'days')
    },
    {
        state: 'Daman and Diu',
        abbreviation: 'DD',
        date: moment().add(10, 'days')
    },
    {
        state: 'Delhi',
        abbreviation: 'DL',
        date: moment().add(11, 'days')
    },
    {
        state: 'Goa',
        abbreviation: 'GA',
        date: moment().add(12, 'days')
    },
    {
        state: 'Gujarat',
        abbreviation: 'GJ',
        date: moment().add(13, 'days')
    },
    {
        state: 'Haryana',
        abbreviation: 'HR',
        date: moment().add(14, 'days')
    },
    {
        state: 'Himachal Pradesh',
        abbreviation: 'HP',
        date: moment().add(15, 'days')
    },
    {
        state: 'Jammu and Kashmir',
        abbreviation: 'JK',
        date: moment().add(16, 'days')
    },
    {
        state: 'Jharkhand',
        abbreviation: 'JH',
        date: moment().add(17, 'days')
    },
    {
        state: 'Karnataka',
        abbreviation: 'KA',
        date: moment().add(18, 'days')
    },
    {
        state: 'Kerala',
        abbreviation: 'KL',
        date: moment().add(19, 'days')
    },
    {
        state: 'Lakshadweep',
        abbreviation: 'LD',
        date: moment().add(20, 'days')
    },
    {
        state: 'Madhya Pradesh',
        abbreviation: 'MP',
        date: moment().add(21, 'days')
    },
    {
        state: 'Maharashtra',
        abbreviation: 'MH',
        date: moment().add(22, 'days')
    },
    {
        state: 'Manipur',
        abbreviation: 'MN',
        date: moment().add(23, 'days')
    },
    {
        state: 'Meghalaya',
        abbreviation: 'ML',
        date: moment().add(24, 'days')
    },
    {
        state: 'Mizoram',
        abbreviation: 'MZ',
        date: moment().add(25, 'days')
    },
    {
        state: 'Nagaland',
        abbreviation: 'NL',
        date: moment().add(26, 'days')
    },
    {
        state: 'Odisha',
        abbreviation: 'OR',
        date: moment().add(27, 'days')
    },
    {
        state: 'Puducherry',
        abbreviation: 'PY',
        date: moment().add(28, 'days')
    },
    {
        state: 'Punjab',
        abbreviation: 'PB',
        date: moment().add(29, 'days')
    },

    {
        state: 'Rajasthan',
        abbreviation: 'RJ',
        date: moment().add(30, 'days')
    },

    {
        state: 'Sikkim',
        abbreviation: 'SK',
        date: moment().add(31, 'days')
    },

    {
        state: 'Tamil Nadu',
        abbreviation: 'TN',
        date: moment().add(32, 'days')
    },
    {
        state: 'Telangana',
        abbreviation: 'TG',
        date: moment().add(33, 'days')
    },
    {
        state: 'Tripura',
        abbreviation: 'TR',
        date: moment().add(34, 'days')
    },
    {
        state: 'Uttar Pradesh',
        abbreviation: 'UP',
        date: moment().add(35, 'days')
    },
    {
        state: 'Uttarakhand',
        abbreviation: 'UT',
        date: moment().add(36, 'days')
    },
    {
        state: 'West Bengal',
        abbreviation: 'WB',
        date: moment().add(37, 'days')
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
