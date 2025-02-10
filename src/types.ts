export interface SessionOptions<T> {
  storageType?: "localStorage" | "sessionStorage" | "cookies";
  accountType?: T;
}
