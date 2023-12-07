export interface Cart {
  id: string;
  userId: string;
  restId: string;
  items: Map<string, number>;
  deliveryAddress: string;
  total: number;
  noofItems: number;
  orderPlaced: boolean;
}
