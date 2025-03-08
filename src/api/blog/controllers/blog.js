"use strict";

/**
 * Custom CRUD Controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::blog.blog", ({ strapi }) => ({
  /**
   * Create a new record
   */
  async create(ctx) {
    try {
      const data = ctx.request.body;
      const entity = await strapi.entityService.create("api::blog.blog", { data });
      return ctx.send(entity, 201);
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  /**
   * Get all records (Read All)
   */
  async find(ctx) {
    try {
      const entities = await strapi.entityService.findMany("api::blog.blog",{populate: "*"});
      return ctx.send(entities);
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  /**
   * Get a single record by ID (Read One)
   */
  async findOne(ctx) {
    try {
      const { id } = ctx.params;
      if (!id) return ctx.badRequest("ID is required");

      const entity = await strapi.entityService.findOne("api::blog.blog", id,{populate: "*"});

      if (!entity) return ctx.notFound("Record not found");
      return ctx.send(entity);
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  /**
   * Update a record by ID
   */
  async update(ctx) {
    try {
      const { id } = ctx.params;
      const data = ctx.request.body;

      if (!id) return ctx.badRequest("ID is required");

      const updatedEntity = await strapi.entityService.update("api::blog.blog", id, {
        data,
      });

      if (!updatedEntity) return ctx.notFound("Record not found");
      return ctx.send(updatedEntity);
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  /**
   * Delete a record by ID
   */
  async delete(ctx) {
    try {
      const { id } = ctx.params;
      if (!id) return ctx.badRequest("ID is required");

      const deletedEntity = await strapi.entityService.delete("api::blog.blog", id);

      if (!deletedEntity) return ctx.notFound("Record not found");
      return ctx.send({ message: "Record deleted successfully" });
    } catch (error) {
      ctx.throw(500, error);
    }
  },
}));
