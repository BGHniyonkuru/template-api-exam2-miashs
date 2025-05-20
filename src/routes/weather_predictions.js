// routes/weatherPredictions.js
export default async function (fastify) {
    fastify.get('/', {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            cityIdentifier: { type: 'string' },
            apiKey: { type: 'string' },
          }
        }
      }
    }, async (request, reply) => {
      const { cityIdentifier, apiKey } = request.query;
      try {
        // TODO: appelle Weather API et retourne un array de :
        // { cityId, cityName, predictions:[{ minTemperature, maxTemperature, date }] }
        const result = [];
        return result;
      } catch (err) {
        request.log.error(err);
        return reply.status(500).send({ success: false, error: err.message });
      }
    });
  }
  