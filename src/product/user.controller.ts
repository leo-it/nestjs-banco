import { Controller, Post, Res, HttpStatus, Body, Get, Param, NotFoundException, Delete, Query, Put } from '@nestjs/common';
import { UserService } from "./user.service";

import { CreateUserDTO } from "./dto/user.dto";

@Controller('user')
export class UserController {

    constructor(private UserService: UserService) { }

    // Add User: /User/create
    @Post('/create')
    async createUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
        const User = await this.UserService.createUser(createUserDTO);
        return res.status(HttpStatus.OK).json({
            message: 'User Successfully Created',
            User
        });
    }

    // Get users /user
    // @Get('/list')
    @Get('/')
    async getUsers(@Res() res) {
        const users = await this.UserService.getUsers();
        return res.status(HttpStatus.OK).json(users);
    }

    // GET single user: /user/5c9d46100e2e5c44c444b2d1
    @Get('/:userID')
    async getUser(@Res() res, @Param('userID') userID) {
        const user = await this.UserService.getUser(userID);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json(user);
    }

    // Delete User: /delete?userID=5c9d45e705ea4843c8d0e8f7
    @Delete('/delete')
    async deleteUser(@Res() res, @Query('userID') userID) {
        const userDeleted = await this.UserService.deleteUser(userID);
        if (!userDeleted) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'User Deleted Successfully',
            userDeleted
        });
    }

    // Update User: /update?userID=5c9d45e705ea4843c8d0e8f7
    @Put('/update')
    async updateUser(@Res() res, @Body() createUserDTO: CreateUserDTO, @Query('userID') userID) {
        const updatedUser = await this.UserService.updateUser(userID, createUserDTO);
        if (!updatedUser) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'User Updated Successfully',
            updatedUser 
        });
    }

}
