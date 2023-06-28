import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { UsersService } from "../users.service";
import { User } from "../user.entity";

declare global {
    namespace Express {
        interface Request {
            currentUser?: User;  // this will fix the error in line 26, a type definition error because current user is not defined in Request type
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(
        private userService: UsersService,
    ) {}


    async use(req: Request, res: Response, next: NextFunction) { // Next -> next middleware we might have in the chain of middlewares
        const { userId } = req.session || {};

        if (userId) {
            const user = await this.userService.findOne(userId);
            req.currentUser = user;
        }

        next();
    }
}