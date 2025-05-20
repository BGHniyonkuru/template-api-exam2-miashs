// routes/insights.js
export default async function (fastify) {
    fastify.get('/:cityId/insights', {
      schema: {
        params: {
          type: 'object',
          required: ['cityId'],
          properties: { cityId: { type: 'string' } }
        },
        querystring: {
          type: 'object',
          properties: { apiKey: { type: 'string' } }
        }
      }
    }, async (request, reply) => {
      const { cityId } = request.params;
      const { apiKey } = request.query;
      try {
        // TODO: vérifie et récupère depuis City API :
        //   coordinates: [[lat, lon]], population, knownFor
        const data = {
          coordinates: [/* latitude */, /* longitude */],
          population: 0,
          knownFor: [ /* { format, content } */ ]
        };
        return data;
      } catch (err) {
        if (err.statusCode === 404) {
          return reply.status(404).send({ success: false, error: 'City not found' });
        }
        request.log.error(err);
        return reply.status(500).send({ success: false, error: err.message });
      }
    });
  }
  