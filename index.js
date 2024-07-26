import express from 'express';
import { connected } from './DB/db.js';
import { AuthRoutes } from './Routers/Auth.Routes.js';
import { ContentRoutes } from './Routers/Content.Routes.js';
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { RateRoutes } from './Routers/Rate.Route.js';
import { seedDatabase } from './DB/seed.js';


const app = express();

app.use(express.json());
app.use("/users", AuthRoutes);
app.use("/contents", ContentRoutes);
app.use("/rates", RateRoutes)

app.get('/',(req,res)=>{
    res.json({msg:"heyyy!"})
})


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
      title: 'Content Management API',
      description: 'API Documentation',
      version: '1.0.0',
      contact: {
          email: 'hksalaudeen@gmail.com'
      }
  },
  servers: [
    {
        url: 'http://localhost:8080',
        description: 'Local server'
    }
],
  components: {
      securitySchemes: {
          bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
          }
      }
  },
  security: [{
      bearerAuth: []
  }]
};


if (process.env.NODE_ENV !== 'test') {
  const swaggerSpec = swaggerJsdoc({ swaggerDefinition, apis: ['./Routers/*.js'] });

  
  app.get('/swagger.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
  });

  
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

// Check if seeding should be done based on environment variables or configuration
const shouldSeed = process.env.NODE_ENV !== 'production' && process.env.SEED_DATABASE === 'true';
if (shouldSeed) {
  await seedDatabase();
}

app.listen(8080,async ()=>{
    try {
        console.log("server is connected");
        await connected;
        console.log('db is connected')
    } catch (error) {
        console.log(error);
    }
})