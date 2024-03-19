import UserRouter from "./users.routers.js";
import ProductsRouter from "./products.routers.js";
import OrdersRouter from "./orders.routers.js";
import ProvidersRouter from "./providers.routers.js";
import NewsRouter from "./news.routers.js";
import UpDateRouter from "./upDate.routers.js";

export const userRouter = new UserRouter().getRouter();
export const productRouter = new ProductsRouter().getRouter();
export const orderRouter = new OrdersRouter().getRouter();
export const providerRouter = new ProvidersRouter().getRouter();
export const newsRouter = new NewsRouter().getRouter();
export const upDateRouter = new UpDateRouter().getRouter();