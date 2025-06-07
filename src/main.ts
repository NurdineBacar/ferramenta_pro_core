import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração CORS para permitir Flutter e Render
  app.enableCors({
    origin: '*', // Permite todas as origens (em produção, substitua pelo URL do seu app Flutter)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  await app.listen(5050, '0.0.0.0'); // Escuta em todos os IPs (importante para Render)
  console.log(`Servidor rodando em http://0.0.0.0:5050`);
}
bootstrap();
