import { Controller, Post, HttpCode, HttpStatus, Body, Get, ValidationPipe } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger'
import { PaymentService } from './payment.service'
import { TransactionDto, SuccessDto, UserRegisterDto } from './payment.dto'

@ApiUseTags('Payment')
@Controller('payment')
export class PaymentController {
    constructor(
        public readonly paymentService: PaymentService
    ) { }

    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Successfully Registered' })
    @ApiOperation({ title: 'To save a user in the register table.' })
    @Post('user')
    async userRegister(
        @Body() userRegisterDto: UserRegisterDto
    ) {
        return await this.paymentService.registerUser(userRegisterDto)
    }

    // @HttpCode(HttpStatus.OK)
    // @ApiOkResponse({ description: 'Payment Link Created Successfully' })
    // @ApiOperation({ title: 'To create payment and get redirect link in the response for the completion of transaction.' })
    // @Post()
    // async payment(@Body() transactionDto: TransactionDto) {
    //     return await this.paymentService.payment(transactionDto)
    // }

    // @HttpCode(HttpStatus.OK)
    // @ApiOkResponse({ description: 'Payment Successful' })
    // @ApiOperation({ title: 'To complete the transaction by going through the link.' })
    // @Get('success')
    // async success(@Body() successDto: SuccessDto) {
    //     return await this.paymentService.success(successDto)
    // }

    // @HttpCode(HttpStatus.OK)
    // @ApiOkResponse({ description: 'Payment Cancelled' })
    // @ApiOperation({ title: 'To abort the transaction.' })
    // @Get('cancel')
    // async cancel() {
    //     return await this.paymentService.cancel()
    // }

    // @HttpCode(HttpStatus.OK)
    // @ApiOkResponse({ description: 'Withdrawal Successful' })
    // @ApiOperation({ title: 'To check if a registered user is eligible to send ELEMENT TOKEN and withdraw dollars.' })
    // @Post('service')
    // async withdrawalController(@Body(ValidationPipe) transactionDto: TransactionDto) {
    //     return this.paymentService.withdrawalService(transactionDto)
    // }
}
