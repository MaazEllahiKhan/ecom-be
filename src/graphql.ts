
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class AdminUser {
    admin_id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export class AdminSignUpInput {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    token: string;
}

export class AdminLoginInput {
    email: string;
    password: string;
}

export class AdminUpdatePasswordInput {
    email: string;
    password: string;
}

export class AdminChangePasswordInput {
    email: string;
    oldPassword: string;
    newPassword: string;
}

export class AddProductInput {
    name: string;
}

export class AdminSignUpOutput {
    email: string;
}

export class AdminLoginOutput {
    access_token: string;
}

export class TwoFaCredentialsOutput {
    totp_uri: string;
}

export abstract class IMutation {
    abstract adminSignUp(first_name: string, last_name: string, email: string, password: string, token: string): AdminSignUpOutput | Promise<AdminSignUpOutput>;

    abstract addProduct(name?: Nullable<string>, description?: Nullable<string>): Nullable<ProductsEntityOutput> | Promise<Nullable<ProductsEntityOutput>>;
}

export abstract class IQuery {
    abstract adminLogin(email: string, password: string): AdminLoginOutput | Promise<AdminLoginOutput>;

    abstract getSingleNotification(): Nullable<string> | Promise<Nullable<string>>;

    abstract getConsumeNotifications(group?: Nullable<string>, consumer?: Nullable<string>, count?: Nullable<number>): Nullable<string> | Promise<Nullable<string>>;

    abstract getOrderItems(): Nullable<OrderItemEntityOutput[]> | Promise<Nullable<OrderItemEntityOutput[]>>;

    abstract getProducts(): Nullable<ProductsEntityOutput[]> | Promise<Nullable<ProductsEntityOutput[]>>;

    abstract searchProducts(name?: Nullable<string>, description?: Nullable<string>): Nullable<ProductSearchEntityOutput[]> | Promise<Nullable<ProductSearchEntityOutput[]>>;
}

export class RedisEventOutput {
    hello?: Nullable<string>;
    date?: Nullable<string>;
}

export abstract class ISubscription {
    abstract redisEvents(): Nullable<RedisEventOutput> | Promise<Nullable<RedisEventOutput>>;

    abstract productAdded(): Nullable<ProductsEntityOutput> | Promise<Nullable<ProductsEntityOutput>>;
}

export class OrderEntityOutput {
    orderId?: Nullable<number>;
    createdAt?: Nullable<string>;
    websiteSessionId?: Nullable<number>;
    userId?: Nullable<number>;
    primaryProductId?: Nullable<number>;
    itemsPurchased?: Nullable<number>;
    priceUsd?: Nullable<number>;
    cogsUsd?: Nullable<number>;
}

export class OrderItemEntityOutput {
    orderItemId?: Nullable<number>;
    createdAt?: Nullable<number>;
    orderId?: Nullable<OrderEntityOutput>;
    productId?: Nullable<ProductsEntityOutput>;
    isPrimaryItem?: Nullable<number>;
    priceUsd?: Nullable<number>;
    cogsUsd?: Nullable<number>;
}

export class ProductsEntityOutput {
    productId: number;
    createdAt?: Nullable<string>;
    productName?: Nullable<string>;
}

export class ProductSearchEntityOutput {
    itemNo: number;
    categoryName?: Nullable<string>;
    itemDescription?: Nullable<string>;
    vendor?: Nullable<number>;
    vendorName?: Nullable<string>;
    bottleSize?: Nullable<number>;
    pack?: Nullable<number>;
    innerPack?: Nullable<number>;
    age?: Nullable<string>;
    proof?: Nullable<number>;
    listDate?: Nullable<string>;
    upc?: Nullable<string>;
    scc?: Nullable<string>;
    bottlePrice?: Nullable<string>;
    shelfPrice?: Nullable<number>;
    caseCost?: Nullable<number>;
}

type Nullable<T> = T | null;
