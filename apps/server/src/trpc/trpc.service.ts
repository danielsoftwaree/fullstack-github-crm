import { Injectable } from '@nestjs/common';
import { initTRPC } from '@trpc/server';
import { TrpcContext } from './trpc.context';
@Injectable()
export class TrpcService {
    trpc = initTRPC.context<TrpcContext>().create();
    procedure = this.trpc.procedure;
    router = this.trpc.router;
    mergeRouters = this.trpc.mergeRouters;
}
