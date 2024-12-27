import { createParamDecorator } from "@nestjs/common";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
import { JWTPayLoadType } from '../../utils/types';
import { CURRENT_USER_KEY } from 'src/utils/constant';


// Current user parameter  decorator 
export const CurrentUser = createParamDecorator( 
  (data , context: ExecutionContextHost) => {
    const request = context.switchToHttp().getRequest();        // request
    const payload: JWTPayLoadType = request[CURRENT_USER_KEY];        // user 
    return payload;                                                // return payload
  }
)