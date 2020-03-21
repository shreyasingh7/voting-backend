import { Injectable, BadRequestException } from '@nestjs/common'
import { getUserBy, UserRepository, getVotingBy, getVotingsBy, getCountBy, CountRepository, getUsersBy } from './voting.repository'
import { UserRegisterDto, UpdatePasswordDto, LoginDto, VotingDto, ContactDto, CountDto } from './voting.dto'
import { array } from '../../helpers'
import { Register, Voting, Contact, Count } from './voting.types'
import { Users, Votings, Contacts, Counts } from './voting.entity'
import { getRepository } from 'typeorm'
import * as nodemailer from 'nodemailer'
import * as validator from 'aadhaar-validator'
import * as TelegramBot from 'node-telegram-bot-api'
import * as unirest from 'unirest'

@Injectable()
export class VotingService {
    http: any
    constructor(
        private readonly userRepository: UserRepository,
        private readonly countRepository: CountRepository
    ) {
    }

    async registerUser(
        userRegisterDto: UserRegisterDto
    ) {
        const validate = validator.isValidNumber(userRegisterDto.adharId)
        if (validate) {
            const otp = Math.random().toString(36).substr(2, 11)
            const pass = Math.random().toString(36).substr(2, 8)

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'aakshitbansal4321@gmail.com',
                    pass: '@kshitban'
                }
            })

            const info = await transporter.sendMail({
                from: 'electioncommissionofindia91@gmail.com',
                to: userRegisterDto.email,
                subject: 'Sending Email using Node.js',
                text: 'Hi' + userRegisterDto.firstName,
                html: '<p>Welcome To online voting system by ELECTION COMMISSION OF INDIA. Do not share this password with anyone.</p></br><p>Your Password is: '
                    + pass + '</p></br><p>If you want to change the password then use http://localhost:3000/update</p>'
            })
            for (let i = 0; i <= 35; i++) {
                if (array[i].state == userRegisterDto.state) {

                    const vote = array[i].abbreviation + otp
                    const votingNumber = vote.toUpperCase()
                    const name = userRegisterDto.firstName + ' ' + userRegisterDto.lastName
                    const object: Register = {
                        name,
                        email: userRegisterDto.email,
                        adharId: userRegisterDto.adharId,
                        state: array[i].abbreviation,
                        voterId: votingNumber,
                        gender: userRegisterDto.gender,
                        contactNumber: userRegisterDto.contactNumber,
                        password: pass,
                        status: false,
                    }
                    getRepository(Users).insert(object)
                    return object
                }
            }
        }
        else {
            throw new BadRequestException('Adhaar Invalid..')
        }
    }

    async getAllUsers() {
        const users = await getUsersBy({});
        return users;
    }

    async updatePassword(updatePasswordDto: UpdatePasswordDto) {
        try {
            const user = await getUserBy({ email: updatePasswordDto.email, password: updatePasswordDto.password })
            if (user) {
                await this.userRepository.updatePassword({
                    email: user.email,
                    password: updatePasswordDto.newPassword,
                    newPassword: updatePasswordDto.password
                })
                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: 'aakshitbansal4321@gmail.com',
                        pass: '@kshitban'
                    }
                })

                const info = await transporter.sendMail({
                    from: 'electioncommissionofindia91@gmail.com',
                    to: user.email,
                    subject: 'Sending Email using Node.js',
                    text: 'Hello' + user.name,
                    html: '<p>Welcome again!!! Do not share this voterId with anyone.</p></br><p>Your VoterId is: ' + user.voterId + '</p>'
                })
            }
            else {
                throw new BadRequestException('User does not exist')
            }
        } catch (err) {
            console.log(err.message)
            throw new BadRequestException(err.message)
        }

    }

    async login(loginDto: LoginDto) {
        const user = await getUserBy({ email: loginDto.email, password: loginDto.password, voterId: loginDto.voterId })
        if (user) {
            // tslint:disable-next-line: no-console
            console.log('Login Successful')
            const nowDate = new Date()
            const date = nowDate.getFullYear() + '/' + (nowDate.getMonth() + 1) + '/' + nowDate.getDate()
            const voting = await getVotingBy({ voterId: loginDto.voterId })
            if (!voting) {

                for (let i = 0; i <= 35; i++) {
                    if (user.state == array[i].abbreviation) {
                        if (array[i].date == date) {
                            console.log('You can vote now!!!!!!!!!!!!!')
                        }
                        else {
                            console.log('Your voting date is on', array[i].date)
                        }
                    }
                }
            }
            else {
                console.log('You have already casted your vote!!!!!!!!!!!!!!')
            }
        }
        else {
            // tslint:disable-next-line: no-console
            console.log('Login Unsuccessful')
        }
    }

    async voting(votingDto: VotingDto) {

        const user = await getUserBy({ voterId: votingDto.voterId })
        if (user && user.state == votingDto.state) {
            if (user.status == false) {
                const object: Voting = {
                    voterId: votingDto.voterId,
                    vote: votingDto.vote,
                    state: user.state
                }
                getRepository(Votings).insert(object)
                const result = await getCountBy({ state: votingDto.state })
                if (result) {
                    if (votingDto.vote == 'BJP') {
                        await this.countRepository.updateBJP(result)
                    }
                    else if (votingDto.vote == 'congress') {
                        await this.countRepository.updateCongress(result)
                    }
                    else {
                        await this.countRepository.updateOther(result)
                    }
                }
                else {
                    const obj: Count = {
                        state: votingDto.state,
                        BJP: 0,
                        congress: 0,
                        other: 0
                    }
                    if (votingDto.vote == 'BJP') {
                        obj.BJP = obj.BJP + 1
                    }
                    else if (votingDto.vote == 'congress') {
                        obj.congress = obj.congress + 1
                    }
                    else {
                        obj.other = obj.other + 1
                    }
                    getRepository(Counts).insert(obj)
                }
                console.log('Vote Casted Successfully!!!!!!!!!!')
                await this.userRepository.updateStatus(user)
                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: 'aakshitbansal4321@gmail.com',
                        pass: '@kshitban'
                    }
                })

                const info = await transporter.sendMail({
                    from: 'electioncommissionofindia91@gmail.com',
                    to: user.email,
                    subject: 'Sending Email using Node.js',
                    text: 'Hello' + user.name,
                    html: '<p>Thank you for voting. Your vote has been casted!!!!!!!!!!!!!!</p>'
                })
                return object
            }
            else {
                console.log('Your vote is already casted!!!!!!!!!')
            }
        }
        else {
            console.log('Incorrect Details!!!!!!!!!!!!!')
        }

    }

    async contact(contactDto: ContactDto) {
        const object: Contact = {
            from: contactDto.from,
            subject: contactDto.subject,
            message: contactDto.message,
        }
        getRepository(Contacts).insert(object)
        unirest
            .get('https://api.telegram.org/bot949383555:AAGo9xaWc65ZrQe2Z0hKwxumG5rSzRTMAMg/sendMessage')
            .headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' })
            .send({ chat_id: '-443641495', text: contactDto.from })
            .then((response) => {
                console.log(response.body)
            })
        return object
    }

    async upcomingElections() {
        const arr = []
        const nowDate = new Date()
        for (let i = 0; i <= 35; i++) {
            const date = nowDate.getFullYear() + '/' + (nowDate.getMonth() + 1) + '/' + nowDate.getDate()

            if (array[i].date >= date) {
                arr.push(array[i])
            }

        }
        return arr
    }

    async upcomingStateElections(countDto: CountDto) {
        for (let i = 0; i <= 35; i++) {
            if (countDto.state == array[i].state) {
                return array[i]
            }
            if (countDto.state == array[i].abbreviation) {
                return array[i]
            }
        }
    }

    async stateResult(countDto: CountDto) {
        const obj: Count = {
            state: countDto.state,
            BJP: 0,
            congress: 0,
            other: 0,
        }
        const result = await getCountBy({ state: countDto.state })
        if (result == undefined) {
            return obj
        }
        else {
            return result
        }

    }

    async result() {
    }
}

//     async voting(transactionDto: TransactionDto) {

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
//                     paypal.voting.create(createPaymentJson, (error, voting) => {
//                         if (error) {
//                             reject(error)
//                         } else {
//                             for (const value of voting.links) {
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
//             paypal.voting.execute(paymentId, executePaymentJson, async (error, voting) => {
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
