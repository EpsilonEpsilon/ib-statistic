import {PrismaClient} from "@prisma/client";
import {OnModuleInit} from "@nestjs/common";

class PrismaService extends PrismaClient implements OnModuleInit{
    onModuleInit() {
        this.$connect();
    }
}


export default PrismaService;
