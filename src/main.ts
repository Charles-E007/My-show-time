import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import flash from 'connect-flash';

// On utilise le require classique ici pour éviter les caprices de TypeScript au runtime
const hbs = require('hbs');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Activation des CORS
  app.enableCors();

  // Configuration des dossiers statiques et des vues
  app.useStaticAssets(join(process.cwd(), 'uploads'), { prefix: '/uploads' });
  app.useStaticAssets(join(process.cwd(), 'public'));
  app.setBaseViewsDir(join(process.cwd(), 'views'));
  app.setViewEngine('hbs');

  // Enregistrement du helper (plus besoin de re-déclarer "const hbs" ici)
  hbs.registerHelper('eq', (a, b) => a === b);

  // Gestion des Sessions persistantes via MongoDB Atlas
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'secret-key-showtime',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI!, // Le "!" indique à TS que la variable sera bien là
        collectionName: 'sessions',
        ttl: 60 * 60 * 24, // 1 jour
      }),
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24,
      },
    }),
  );

  // Configuration de Flash et Passport
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());

  // Middleware pour passer l'utilisateur connecté aux vues HBS
  app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
  });

  // Gestion dynamique du Port pour Vercel
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();