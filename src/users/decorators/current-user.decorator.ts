import {
  createParamDecorator,
  ExecutionContext
} from '@nestjs/common'

export const CurrentUser = createParamDecorator(
  // data will be the thing inside the param of the decorator (in the controller)
  // context can be any request incomming from the internet
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    console.log(request.session.userId);
    return request.CurrentUser;
  }

)