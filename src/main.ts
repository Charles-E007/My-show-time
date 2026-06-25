import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo'; // 1. On réactive le store MongoDB
import flash from 'connect-flash';
import * as hbs from 'hbs'; // Importation propre de hbs pour TypeScript

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Activation des CORS (très utile pour la production)
  app.enableCors();

  // Configuration des dossiers statiques et des vues
  app.useStaticAssets(join(process.cwd(), 'uploads'), { prefix: '/uploads' });
  app.useStaticAssets(join(process.cwd(), 'public'));
  app.setBaseViewsDir(join(process.cwd(), 'views'));
  app.setViewEngine('hbs');

  // Enregistrement des helpers Handlebars
  hbs.registerHelper('eq', (a, b) => a === b);

  // 2. Gestion des Sessions persistantes via MongoDB Atlas
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'secret-key-showtime', // Utilise une variable d'environnement ou une clé par défaut
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI, // Utilise la variable d'environnement connectée à Atlas !
        collectionName: 'sessions',
        ttl: 60 * 60 * 24, // Durée de vie d'un jour (en secondes)
      }),
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // true en production (HTTPS requis)
        maxAge: 1000 * 60 * 60 * 24, // 1 jour (en millisecondes)
      },
    }),
  );

  // Configuration de Flash messages et Passport
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());

  // Middleware global pour passer l'utilisateur connecté aux vues HBS
  app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
  });

  // Gestion dynamique du Port exigé par Vercel
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();