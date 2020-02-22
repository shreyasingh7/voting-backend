import { IsString, IsEmail,  IsOptional } from 'class-validator'

export class UserRegisterDto {
    @IsString()
    readonly firstName: string

    @IsString()
    readonly lastName: string

    @IsString()
    readonly gender: string

    @IsString()
    readonly contactNumber: string

    @IsString()
    @IsEmail()
    readonly email: string
    @IsString()
    readonly adharId: string
    @IsString()
    readonly state: string
}

export class UpdatePasswordDto {
    @IsString()
    @IsOptional()
    @IsEmail()
    readonly email: string

    @IsString()
    readonly password: string

    @IsOptional()
    @IsString()
    readonly newPassword: string
}

export class LoginDto {

    @IsString()
    readonly voterId: string

    @IsString()
    @IsEmail()
    readonly email: string

    @IsString()
    readonly password: string
}

export class VotingDto {
    @IsString()
    readonly voterId: string

    @IsString()
    readonly vote: string

    @IsString()
    readonly state: string
}