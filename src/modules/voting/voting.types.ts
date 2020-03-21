export interface Register {
    name: string

    email: string

    voterId: string

    adharId: string

    state: string

    password: string

    status: boolean

    gender: string

    contactNumber: string

}

export interface Voting {
    voterId: string

    vote: string

    state: string
}

export interface Contact {
    from: string

    subject: string

    message: string
}

export interface Count {
    state: string

    BJP: number

    congress: number

    other: number
}
