import UserRouter from "./users.routers.js";
import ProductsRouter from "./products.routers.js";
import OrdersRouter from "./orders.routers.js";
import ProvidersRouter from "./providers.routers.js";

export const userRouter = new UserRouter().getRouter();
export const productRouter = new ProductsRouter().getRouter();
export const orderRouter = new OrdersRouter().getRouter();
export const providerRouter = new ProvidersRouter().getRouter();