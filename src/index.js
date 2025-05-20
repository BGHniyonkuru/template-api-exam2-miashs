// src/index.js
import 'dotenv/config'
import Fastify from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'

import citiesAPI        from './citiesAPI.js'
import cityRecipes      from './cityRecipes.js'
import deleteCityRecipe from './deleteCityRecipe.js'
import { submitForReview } from './submission.js'

const fastify = Fastify({ logger: true })

// --- 1) Plugin Swagger pour générer le spec OpenAPI ---
fastify.register(swagger, {
  swagger: {
    info: {
      title: 'MIASHS Exams API',
      description: 'Documentation des endpoints pour MIASHS Exams',
      version: '1.0.0'
    },
    host: process.env.RENDER_EXTERNAL_URL
      ? new URL(process.env.RENDER_EXTERNAL_URL).host
      : `localhost:${process.env.PORT || 3000}`,
    schemes: ['https', 'http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'cities',  description: 'Opérations sur les villes' },
      { name: 'recipes', description: 'Gestion des recettes' }
    ]
  }
})

// --- 2) Plugin Swagger-UI pour servir l’UI sur /docs ---
fastify.register(swaggerUI, {
  routePrefix: '/docs',
  uiConfig: { docExpansion: 'list', deepLinking: true },
  staticCSP: true,
  transformStaticCSP: header => header
})

// --- 3) Enregistrement de tes routes ---
fastify.register(citiesAPI,        { prefix: '/cities' })
fastify.register(cityRecipes,      { prefix: '/cities' })
fastify.register(deleteCityRecipe, { prefix: '/cities' })

// --- 4) Lancement du serveur ---
fastify.listen(
  {
    port: process.env.PORT || 3000,
    host: process.env.RENDER_EXTERNAL_URL
      ? '0.0.0.0'
      : process.env.HOST || 'localhost'
  },
  (err) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    // À NE PAS SUPPRIMER : soumission automatique pour la revue MIASHS
    submitForReview(fastify)
    fastify.log.info(
      `🚀 Server listening at ${process.env.RENDER_EXTERNAL_URL ?? `http://localhost:${process.env.PORT||3000}`}`
    )
    fastify.log.info(`📖 Swagger UI available at ${process.env.RENDER_EXTERNAL_URL ?? `http://localhost:${process.env.PORT||3000}`}/docs`)
  }
)
