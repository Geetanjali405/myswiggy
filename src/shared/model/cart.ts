export interface Cart {
  id: string;
  userId: string;
  restId: string;
  items: Map<string, number>;
  deliveryAddress: string;
  total: number;
  orderPlaced: boolean;
}
