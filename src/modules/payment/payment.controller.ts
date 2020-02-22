import { Controller, Post, HttpCode, HttpStatus, Body, Get, ValidationPipe } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger'
import { PaymentService } from './payment.service'
import { UserRegisterDto, UpdatePasswordDto, LoginDto, VotingDto } from './payment.dto'

@ApiUseTags('Voting')
@Controller('voting')
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

    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Updated'})
    @ApiOperation({ title: 'To save a user in the register table.' })
    @Post('password')
    async updatePassword(
        @Body() updatePasswordDto: UpdatePasswordDto
    ) {
        return await this.paymentService.updatePassword(updatePasswordDto)
    }

    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Updated'})
    @ApiOperation({ title: 'Login Successful' })
    @Post('login')
    async login(
        @Body() loginDto: LoginDto
    ) {
        return await this.paymentService.login(loginDto)
    }

    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Updated'})
    @ApiOperation({ title: 'Vote Casted'})
    @Post('vote')
    async voting(
        @Body() votingDto: VotingDto
    ) {
        return await this.paymentService.voting(votingDto)
    }
}
