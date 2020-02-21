import { IsString, IsNotEmpty, IsEmail, IsNumber, IsOptional } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger'

export class UserRegisterDto {
    @IsString()
    readonly name: string

    @IsString()
    readonly email: string
    @IsString()
    readonly adharId: string
    @IsString()
    readonly address: string
    @IsString()
    readonly password: string
}

export class TransactionDto {
    @ApiModelProperty()
    @IsString()
    waxUsername: string
}

export class SuccessDto {
    @ApiModelProperty()
    @IsString()
    payerId: string

    @ApiModelProperty()
    @IsString()
    paymentId: string

    @ApiModelProperty()
    @IsString()
    waxUsername: string

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    creditAmount: string

}
