import { Injectable, BadRequestException } from '@nestjs/common'
import { TransactionRepository, getUserBy, WithdrawalRepository, getWithdrawalsBy, UserRepository, getTransactionBy } from './payment.repository'
import { UserRegisterDto } from './payment.dto'
import { getTime, transaction } from '../../helpers'
import { Transaction, Withdrawal, Register } from './payment.types'
import { Users } from './payment.entity'
import { IncomingMessage } from 'http'
import { createDfuseClient } from '@dfuse/client'
import * as paypal from 'paypal-rest-sdk'
import * as WebSocketClient from 'ws'
import uuid from 'uuid'
import fetch from 'node-fetch'
import { getRepository } from 'typeorm'
import * as nodemailer from 'nodemailer'
import * as validator from 'aadhaar-validator'
import crypto from 'crypto'

@Injectable()
export class PaymentService {
    http: any
    constructor(
        public readonly transactionRepository: TransactionRepository,
        private readonly withdrawalRepository: WithdrawalRepository,
        private readonly userRepository: UserRepository
    ) {
    }

    async registerUser(
        userRegisterDto: UserRegisterDto
    ) {
        const validate = validator.isValidNumber(userRegisterDto.adharId)
        if (validate) {
            const otp = Math.random().toString(36).substr(2, 11)

            const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'aakshitbansal4321@gmail.com',
                pass: '@kshitban'
            }
        })

            const vote = userRegisterDto.address + otp
            const votingNumber = vote.toUpperCase()
            const info = await transporter.sendMail({
            from: 'shreyaosm7@gmail.com',
            to: userRegisterDto.email,
            subject: 'Sending Email using Node.js',
            text: 'Hello world?',
            html: '<p>Do not share this otp with anyone.</p></br><p>Your otp is: ' + votingNumber + '</p>'
        })
            const object: Register = {
            name: userRegisterDto.name,
            email: userRegisterDto.email,
            adharId: userRegisterDto.adharId,
            address: userRegisterDto.address,
            password: userRegisterDto.password,
            voterId: votingNumber,
            status: false,
        }
            getRepository(Users).insert(object)
            return object
        }
        else {
            // tslint:disable-next-line: no-console
            console.log('Aadhar invalid')
        }
    }
}

//     async payment(transactionDto: TransactionDto) {

//         try {
//             const user = await getUserBy({ waxUsername: transactionDto.waxUsername })
//             if (user) {

//                 const transaction = await this.transactionRepository.getTransactionByTime(user.paypalEmail)
//                 if (transaction != undefined) {
//                     const transactionTime = parseInt(transaction.currentTime)
//                     const transactionDueTime = parseInt(transaction.dueTime)

//                     const time = await getTime()
//                     if (parseInt(time.current) >= transactionTime && parseInt(time.current) <= transactionDueTime) {
//                         throw new BadRequestException('You are not allowed to do the transaction')
//                     }
//                 }

//                 paypal.configure({
//                     mode: process.env.MODE,
//                     client_id: process.env.CLIENT_ID,
//                     client_secret: process.env.CLIENT_SECRET
//                 })

//                 const createPaymentJson = {
//                     intent: process.env.CREATE_PAYMENT_INTENT,
//                     payer: {
//                         payment_method: process.env.PAYMENT_METHOD,
//                     },
//                     redirect_urls: {
//                         return_url: process.env.PAYMENT_RETURN_URL,
//                         cancel_url: process.env.PAYMENT_CANCEL_URL,
//                     },
//                     transactions: [{
//                         amount: {
//                             currency: process.env.TRANSACTION_CURRENCY,
//                             total: process.env.TRANSACTION_AMOUNT,
//                         },
//                         description: process.env.TRANSACTION_DESCRIPTION,
//                     }],
//                 }
//                 return new Promise<object>((resolve, reject) => {
//                     paypal.payment.create(createPaymentJson, (error, payment) => {
//                         if (error) {
//                             reject(error)
//                         } else {
//                             for (const value of payment.links) {
//                                 if (value.rel === 'approval_url') {
//                                     resolve({ link: (value.href) })
//                                 }
//                             }
//                         }
//                     })
//                 })
//             } else {
//                 return {
//                     msg: 'User doesnot exist'
//                 }
//             }

//         }
//         catch (error) {
//             throw new BadRequestException(error.message)
//         }

//     }

//     async success(successDto: SuccessDto) {
//         const payerId = successDto.payerId
//         const paymentId = successDto.paymentId

//         const executePaymentJson = {
//             payer_id: payerId,
//             transactions: [{
//                 amount: {
//                     currency: process.env.TRANSACTION_CURRENCY,
//                     total: process.env.TRANSACTION_AMOUNT,
//                 }
//             }]
//         }

//         return new Promise<object>((resolve, reject) => {
//             paypal.payment.execute(paymentId, executePaymentJson, async (error, payment) => {
//                 if (error) {
//                     reject(error.message)
//                 } else {
//                     try {
//                         const user = await getUserBy({ waxUsername: successDto.waxUsername })
//                         if (user) {
//                             const time = getTime()
//                             const object: Transaction = {
//                                 paymentId: successDto.paymentId,
//                                 paypalEmail: user.paypalEmail,
//                                 waxUsername: successDto.waxUsername,
//                                 transactionAmount: process.env.TRANSACTION_AMOUNT,
//                                 currentTime: time.current,
//                                 dueTime: time.newDate
//                             }
//                             const result = await getTransactionBy({ paymentId: successDto.paymentId })
//                             if (!result && process.env.CONTRACT_PRIVATE_KEY != '') {
//                                 await this.transactionRepository.insertTransaction(object)
//                                 const result = await transaction(successDto.waxUsername, successDto.creditAmount,
//                                     process.env.CONTRACT_PRIVATE_KEY)
//                                 if (result) {
//                                     resolve(
//                                         {
//                                             transaction_id: result.transaction_id
//                                         }
//                                     )
//                                 }
//                             } else reject({ msg: 'Project configuration missing..' })
//                         }
//                     }
//                     catch (error) {
//                         reject(error.message)
//                     }
//                 }
//             })
//         })

//     }

//     async cancel() {
//         return 'cancelled'
//     }

//     async getAccessToken() {
//         try {
//             const { data: result } = await this.http.post(`${process.env.ACCESSTOKEN_URL}`, {},
//                 {
//                     headers: {
//                         'Accept': 'application/json',
//                         'Accept-Language': 'en_US',
//                         'content-type': 'application/x-www-form-urlencoded',
//                     },
//                     auth: {
//                         username: process.env.ACCESSTOKEN_USERNAME,
//                         password: process.env.ACCESSTOKEN_PASSWORD,
//                     },
//                     params: {
//                         grant_type: process.env.AUTH_GRANT_TYPE,
//                     }
//                 }).toPromise()
//             return result.access_token
//         } catch (error) {
//             throw new BadRequestException(error.message)
//         }
//     }

//     async sendPayout(value, email) {
//         try {
//             const token = await this.getAccessToken()
//             const data = {
//                 sender_batch_header: {
//                     sender_batch_id: uuid(),
//                     email_subject: process.env.EMAIL_SUBJECT,
//                     email_message: process.env.EMAIL_MESSAGE
//                 },
//                 items: [
//                     {
//                         recipient_type: 'EMAIL',
//                         amount: {
//                             value,
//                             currency: process.env.TRANSACTION_AMOUNT
//                         },
//                         receiver: email
//                     }
//                 ]
//             }
//             const { data: result } = await this.http.post(`${process.env.PAYOUT_URL}`, (data),
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': 'Bearer '.concat(token)
//                     }
//                 }).toPromise()
//         } catch (error) {
//             throw new BadRequestException(error.message)
//         }

//     }

//     async withdrawalService(request: TransactionDto) {
//         const user = await getUserBy({ waxUsername: request.waxUsername })
//         const amount = parseInt(process.env.WITHDRAWAL_AMOUNT)
//         if (user) {
//             const withdrawals = await getWithdrawalsBy({ waxUsername: request.waxUsername })
//             const time = await getTime()
//             const result = withdrawals.filter(res =>
//                 parseInt(time.current) >= parseInt(res.currentTime) && parseInt(time.current) <= parseInt(res.dueTime)
//             )
//             if (result.length > 0) {
//                 const response = result.reduce((acc, obj) => {
//                     return acc + parseFloat(obj.withdrawalAmount)
//                 }, 0)
//                 if (response >= amount) throw new BadRequestException('Already withdrawn more than 10..')
//                 return {
//                     status: true,
//                     amount: amount - response
//                 }
//             } else return {
//                 status: true,
//                 amount
//             }
//         } else throw new BadRequestException('User not exist..')
//     }
// }
