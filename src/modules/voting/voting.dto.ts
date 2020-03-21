import { IsString, IsEmail,  IsOptional } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger'

export class UserRegisterDto {
    @ApiModelProperty()
    @IsString()
    readonly firstName: string

    @ApiModelProperty()
    @IsString()
    readonly lastName: string

    @ApiModelProperty()
    @IsString()
    readonly gender: string

    @ApiModelProperty()
    @IsString()
    readonly contactNumber: string

    @ApiModelProperty()
    @IsString()
    @IsEmail()
    readonly email: string

    @ApiModelProperty()
    @IsString()
    readonly adharId: string

    @ApiModelProperty()
    @IsString()
    readonly state: string
}

export class UpdatePasswordDto {
    @ApiModelProperty()
    @IsString()
    @IsOptional()
    @IsEmail()
    readonly email: string

    @ApiModelProperty()
    @IsString()
    readonly password: string

    @ApiModelProperty()
    @IsOptional()
    @IsString()
    readonly newPassword: string
}

export class LoginDto {

    @ApiModelProperty()
    @IsString()
    readonly voterId: string

    @ApiModelProperty()
    @IsString()
    @IsEmail()
    readonly email: string

    @ApiModelProperty()
    @IsString()
    readonly password: string
}

export class VotingDto {
    @ApiModelProperty()
    @IsString()
    readonly voterId: string

    @ApiModelProperty()
    @IsString()
    readonly vote: string

    @ApiModelProperty()
    @IsString()
    readonly state: string
}

export class ContactDto {
    @ApiModelProperty()
    @IsString()
    readonly from: string

    @ApiModelProperty()
    @IsString()
    readonly subject: string

    @ApiModelProperty()
    @IsString()
    readonly message: string
}

export class CountDto {
    @ApiModelProperty()
    @IsString()
    readonly region: string
}
