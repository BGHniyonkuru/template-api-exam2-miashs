// routes/cities.js
export default async function (fastify) {
    fastify.get('/', {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            search: { type: 'string' },
            apiKey: { type: 'string' },
          }
        }
      }
    }, async (request, reply) => {
      const { search, apiKey } = request.query;
      try {
        // TODO: appelle City API avec search & apiKey
        const cities = []; 
        return cities;
      } catch (err) {
        request.log.error(err);
        return reply.status(500).send({ success: false, error: err.message });
      }
    });
  }
  