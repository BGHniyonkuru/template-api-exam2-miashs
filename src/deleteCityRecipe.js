// routes/deleteCityRecipe.js
import fetch from 'node-fetch'

export default async function (fastify) {
  fastify.delete('/cities/:cityId/recipes/:recipeId', {
    schema: {
      params: {
        type: 'object',
        required: ['cityId','recipeId'],
        properties: {
          cityId: { type: 'string' },
          recipeId: { type: 'string' }
        }
      },
      querystring: {
        type: 'object',
        properties: {
          apiKey: { type: 'string' }
        }
      },
      response: {
        204: { type: 'null' },
        '4xx': {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            error: { type: 'string' }
          },
          required: ['success','error']
        }
      }
    }
  }, async (request, reply) => {
    const { cityId, recipeId } = request.params
    const { apiKey }            = request.query

    const params = new URLSearchParams()
    if (apiKey) params.set('apiKey', apiKey)

    try {
      const res = await fetch(
        `https://api-ugi2pflmha-ew.a.run.app/cities/${encodeURIComponent(cityId)}/recipes/${encodeURIComponent(recipeId)}?${params}`,
        { method: 'DELETE' }
      )
      if (res.status === 204) {
        return reply.code(204).send()
      }
      const payload = await res.json()
      return reply
        .code(res.status)
        .send({ success: false, error: payload.error || res.statusText })
    } catch (err) {
      request.log.error(err)
      return reply.code(500).send({ success: false, error: 'Internal Server Error' })
    }
  })
}
