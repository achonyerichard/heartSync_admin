export enum AdminRole {
  ADMIN = "admin",
  MODERATOR = "moderator",
  MARKETER = "marketer",
  SUPER_ADMIN = "super_admin",
}
export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  OUT_FOR_DELIVERY = "out_for_delivery",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
  DISPUTED = "disputed",
  ON_HOLD = "on_hold",
  RETURNED = "returned",
  REFUNDED = "refunded",
  FAILED = "failed",
  MIXED = "mixed",
  PARTIALLY_SHIPPED = "partially_shipped",
  PARTIALLY_DELIVERED = "partially_delivered",
  PARTIALLY_RETURNED = "partially_returned",
  PARTIALLY_REFUNDED = "partially_refunded",
  PARTIALLY_CANCELLED = "partially_cancelled",
}
export const MARKETER_ROUTES = ["store","marketplace","orders"]
