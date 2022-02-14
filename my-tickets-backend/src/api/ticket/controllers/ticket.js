"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
/**
 *  ticket controller
 */
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::ticket.ticket", ({ strapi }) => ({
  //Find with populate ----------------------------------------
  async find(ctx) {
    // Populates / adds the user relation field
    ctx.query.populate = "user";
    const content = await super.find(ctx);

    //Gets current users email
    const currentUser = ctx.state.user.email;
    // console.log(content.data[0].attributes.user.data.attributes.email)
    // Filters through all results for just the current users tickets
    const usersTickets = content.data.filter(
      (ticket) => ticket.attributes.user.data.attributes.email === currentUser
    );
    // Returns the current users tickets
    return usersTickets;
  },

  // Create user event----------------------------------------
  async create(ctx) {
    let entity;
    ctx.request.body.data.user = ctx.state.user;
    entity = await super.create(ctx);
    return entity;
  },
  // Update user event----------------------------------------
  async update(ctx) {
    let entity;
    const { id } = ctx.params;
    const query = {
      filters: {
        id: id,
        user: { id: ctx.state.user.id },
      },
    };
    const events = await this.find({ query: query });
    console.log(events);
    if (!events.data || !events.data.length) {
      return ctx.unauthorized(`You can't update this entry`);
    }
    entity = await super.update(ctx);
    return entity;
  },

  // Delete a user event----------------------------------------
  async delete(ctx) {
    const { id } = ctx.params;
    const query = {
      filters: {
        id: id,
        user: { id: ctx.state.user.id },
      },
    };
    const events = await this.find({ query: query });
    if (!events.data || !events.data.length) {
      return ctx.unauthorized(`You can't delete this entry`);
    }
    const response = await super.delete(ctx);
    return response;
  },
  // Get logged in users----------------------------------------
  async me(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }
    const query = {
      filters: {
        user: { id: user.id },
      },
    };
    const data = await this.find({ query: query });
    if (!data) {
      return ctx.notFound();
    }
    const sanitizedEntity = await this.sanitizeOutput(data, ctx);
    return this.transformResponse(sanitizedEntity);
  },

  // Add Comment to ticket
  async comment(ctx) {
    let entity;
    ctx.request.body.user = ctx.state.user;
    ctx.request.body.ticket = ctx.params.id;
    entity = await super.create(ctx);
    console.log(await super.create(ctx))
    return entity;
  }
}));

// 'use strict';

// /**
//  *  ticket controller
//  */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::ticket.ticket');

// ({
//     //Adds user that created the ticket as owner
//     async create(ctx) {
//         let entity;
//         if (ctx.is('multipart')) {
//           const { data, files } = parseMultipartData(ctx);
//           data.user = ctx.state.user.id;
//           entity = await strapi.services.ticket.create(data, { files });
//         } else {
//           ctx.request.body.user = ctx.state.user.id;
//           entity = await strapi.services.ticket.create(ctx.request.body);
//         }
//         return sanitizeEntity(entity, { model: strapi.models.ticket });
//       },
// }));
