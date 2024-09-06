import { Module } from '@nestjs/common';

import { BookModule } from './book/book.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [BookModule, ConfigModule.forRoot({isGlobal:true, envFilePath:'./.env'}),
    PrismaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
