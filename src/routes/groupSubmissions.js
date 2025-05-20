// routes/groupSubmissions.js
export default async function (fastify) {
    fastify.post('/submissions', {
      schema: {
        querystring: { 
          type: 'object',
          properties: { apiKey: { type: 'string' } }
        },
        body: {
          type: 'object',
          required: ['apiUrl'],
          properties: {
            apiUrl: { type: 'string' },
            gitRepo: { type: 'string' },
          }
        }
      }
    }, async (request, reply) => {
      const { apiKey } = request.query;
      const { apiUrl, gitRepo } = request.body;
      if (!apiUrl) {
        return reply.status(400).send({ error: 'apiUrl is required' });
      }
      try {
        // TODO: traite la soumission (stockage, notifications…)
        return reply.status(204).send();
      } catch (err) {
        request.log.error(err);
        return reply.status(500).send({ error: err.message });
      }
    });
  }
  