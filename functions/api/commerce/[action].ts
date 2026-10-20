import {handle,type CommerceEnv} from '../../../commerce/core';
import {starterHtml} from '../../../commerce/package';
export const onRequest=({request,env}:{request:Request;env:CommerceEnv})=>handle(request,env,starterHtml);
