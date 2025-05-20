import 'dotenv/config'
import Fastify from 'fastify'
import citiesAPI        from './citiesAPI.js'
import cityRecipes      from './cityRecipes.js'
import deleteCityRecipe from './deleteCityRecipes.js'

import { submitForReview } from './submission.js'

const fastify = Fastify({
  logger: true,
})

// 1) Monte la route qui liste les villes
fastify.register(citiesAPI, {
  prefix: '/cities'
})

// 2) Monte la route qui ajoute une recette
fastify.register(cityRecipes, {
  prefix: '/cities'
})

// 3) Monte la route qui supprime une recette
fastify.register(deleteCityRecipe, {
  prefix: '/cities'
})

fastify.listen(
  {
    port: process.env.PORT || 3000,
    host: process.env.RENDER_EXTERNAL_URL ? '0.0.0.0' : process.env.HOST || 'localhost',
  },
  function (err) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }

    //////////////////////////////////////////////////////////////////////
    // Don't delete this line, it is used to submit your API for review //
    // everytime your start your server.                                //
    //////////////////////////////////////////////////////////////////////
    submitForReview(fastify)
  }
)
