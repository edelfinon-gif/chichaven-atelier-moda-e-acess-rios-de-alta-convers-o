import { Hono } from "hono";
import type { Env } from './core-utils';
import { UserEntity, ChatBoardEntity, ProductEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  app.get('/api/test', (c) => c.json({ success: true, data: { name: 'ChicHaven API' }}));
  // PRODUCTS
  app.get('/api/products', async (c) => {
    await ProductEntity.ensureSeed(c.env);
    const cursor = c.req.query('cursor');
    const limit = c.req.query('limit');
    const category = c.req.query('category');
    const brand = c.req.query('brand');
    const priceMin = c.req.query('priceMin');
    const priceMax = c.req.query('priceMax');
    const result = await ProductEntity.list(c.env, cursor ?? null, limit ? Number(limit) : undefined);
    let filteredItems = result.items;
    if (category) filteredItems = filteredItems.filter(p => p.category === category);
    if (brand) filteredItems = filteredItems.filter(p => p.brand === brand);
    if (priceMin) filteredItems = filteredItems.filter(p => p.price >= Number(priceMin));
    if (priceMax) filteredItems = filteredItems.filter(p => p.price <= Number(priceMax));
    return ok(c, { items: filteredItems, next: result.next });
  });
  app.get('/api/products/:id', async (c) => {
    const id = c.req.param('id');
    const product = new ProductEntity(c.env, id);
    if (!await product.exists()) return notFound(c, 'product not found');
    return ok(c, await product.getState());
  });
  // USERS & CHATS (Keeping for template compatibility if needed)
  app.get('/api/users', async (c) => {
    await UserEntity.ensureSeed(c.env);
    const page = await UserEntity.list(c.env, c.req.query('cursor') ?? null);
    return ok(c, page);
  });
}