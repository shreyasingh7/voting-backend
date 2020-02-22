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
