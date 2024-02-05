import UserRouter from "./users.routers.js";
import ProductsRouter from "./products.routers.js";
import OrdersRouter from "./orders.routers.js";

export const userRouter = new UserRouter().getRouter();
export const productRouter = new ProductsRouter().getRouter();
export const orderRouter = new OrdersRouter().getRouter();