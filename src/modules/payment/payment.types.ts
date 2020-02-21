export interface Register {
    name: string
    
    email: string
    
    voterId: string
   
    adharId: string
    
    address: string
   
    password: string

    status: boolean

}

export interface Transaction {
    waxUsername: string
    paypalEmail: string
    currentTime: string
    dueTime: string
    transactionAmount: string
    paymentId: string
}

export interface Withdrawal {
    waxUsername: string,
    paypalEmail: string,
    currentTime: string,
    dueTime: string,
    withdrawalAmount: string
}
