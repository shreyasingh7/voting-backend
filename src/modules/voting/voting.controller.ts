import { Controller, Post, HttpCode, HttpStatus, Body, Get, ValidationPipe } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger'
import { VotingService } from './voting.service'
import { UserRegisterDto, UpdatePasswordDto, LoginDto, VotingDto, ContactDto, CountDto } from './voting.dto'

@ApiUseTags('Voting')
@Controller('voting')
export class VotingController {
    constructor(
        public readonly votingService: VotingService
    ) { }

    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Successfully Registered' })
    @ApiOperation({ title: 'To save a user in the register table.' })
    @Post('user')
    async userRegister(
        @Body() userRegisterDto: UserRegisterDto
    ) {
        return await this.votingService.registerUser(userRegisterDto)
    }

    @Get('getUsers')
    async getUsers() {
        return await this.votingService.getAllUsers();
    }

    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Updated'})
    @ApiOperation({ title: 'To update password.' })
    @Post('password')
    async updatePassword(
        @Body() updatePasswordDto: UpdatePasswordDto
    ) {
        return await this.votingService.updatePassword(updatePasswordDto)
    }

    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Updated'})
    @ApiOperation({ title: 'Login Successful' })
    @Post('login')
    async login(
        @Body() loginDto: LoginDto
    ) {
        return await this.votingService.login(loginDto)
    }

    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Updated'})
    @ApiOperation({ title: 'Vote Casted'})
    @Post('vote')
    async voting(
        @Body() votingDto: VotingDto
    ) {
        return await this.votingService.voting(votingDto)
    }

    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Done'})
    @ApiOperation({ title: 'ContactUs'})
    @Post('contact')
    async contact(
        @Body() contactDto: ContactDto
    ) {
        return await this.votingService.contact(contactDto)
    }

    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Done'})
    @ApiOperation({ title: 'Election Details'})
    @Post('upcomingElections')
    async elections(
    ) {
        return await this.votingService.upcomingElections()
    }
    upcomingStateElections

    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Done'})
    @ApiOperation({ title: 'Statewise Election Detail'})
    @Post('upcomingStateElections')
    async stateElections(
        @Body() countDto: CountDto
    ) {
        return await this.votingService.upcomingStateElections(countDto)
    }
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Done'})
    @ApiOperation({ title: 'Election Result'})
    @Post('stateResult')
    async stateResult(
        @Body() countDto: CountDto
    ) {
        return await this.votingService.stateResult(countDto)
    }

    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Done'})
    @ApiOperation({ title: 'Election Result'})
    @Post('result')
    async result(
    ) {
        return await this.votingService.result()
    }
}
