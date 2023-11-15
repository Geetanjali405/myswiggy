export interface DeliveryData {
  id: string;
  delId: string;
  orderIdAndStatus: { [orderId: string]: string };
}
