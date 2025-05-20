// routes/cityRecipes.js
import fetch from 'node-fetch'

export default async function (fastify) {
  fastify.post('/cities/:cityId/recipes', {
    schema: {
      params: {
        type: 'object',
        required: ['cityId'],
        properties: {
          cityId: { type: 'string' }
        }
      },
      querystring: {
        type: 'object',
        properties: {
          apiKey: { type: 'string' }
        }
      },
      body: {
        type: 'object',
        required: ['content'],
        properties: {
          content: { type: 'string', minLength: 1 }
        }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            content: { type: 'string' }
          },
          required: ['id','content']
        },
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
    const { cityId }   = request.params
    const { apiKey }   = request.query
    const { content }  = request.body

    const params = new URLSearchParams()
    if (apiKey) params.set('apiKey', apiKey)

    try {
      const res = await fetch(
        `https://api-ugi2pflmha-ew.a.run.app/cities/${encodeURIComponent(cityId)}/recipes?${params}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content })
        }
      )
      const payload = await res.json()
      if (res.status === 201) {
        return reply.code(201).send(payload)
      }
      return reply
        .code(res.status)
        .send({ success: false, error: payload.error || res.statusText })
    } catch (err) {
      request.log.error(err)
      return reply.code(500).send({ success: false, error: 'Internal Server Error' })
    }
  })
}
