import mongoose from "mongoose";

import { env } from "@/config/env";

declare global {
  var mongooseCache:
    | {
        connection: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const globalCache = globalThis.mongooseCache ?? {
  connection: null,
  promise: null,
};

globalThis.mongooseCache = globalCache;

export async function connectDB() {
  if (globalCache.connection) {
    console.log("Initializing Mongodb from global cache");
    return globalCache.connection;
  }

  if (!globalCache.promise) {
    globalCache.promise = mongoose.connect(env.MONGODB_URI, {
      dbName: "adforge-ai",
    });
  }

  globalCache.connection = await globalCache.promise;
  console.log("Initializing Mongodb from scratch");

  return globalCache.connection;
}
