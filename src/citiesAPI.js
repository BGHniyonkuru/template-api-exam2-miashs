// routes/citiesAPI.js
import fetch from 'node-fetch'

export default async function (fastify) {
  fastify.get('/cities', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          search: { type: 'string' },
          apiKey: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            required: ['id','cityName','countryName'],
            properties: {
              id: { type: 'string' },
              cityName: { type: 'string' },
              countryName: { type: 'string' }
            }
          }
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
    const { search, apiKey } = request.query
    const params = new URLSearchParams()
    if (search)  params.set('search', search)
    if (apiKey)  params.set('apiKey', apiKey)

    try {
      const res = await fetch(`https://api-ugi2pflmha-ew.a.run.app/cities?${params}`)
      const payload = await res.json()
      if (!res.ok) {
        return reply
          .code(res.status)
          .send({ success: false, error: payload.error || res.statusText })
      }
      return payload
    } catch (err) {
      request.log.error(err)
      return reply.code(500).send({ success: false, error: 'Internal Server Error' })
    }
  })
}
