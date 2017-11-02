export interface Menu {
  id: string;
  tableNum: string;
  timestamp: string;
  orderPerson: string;
  totalPrice: number;
  orders: FoodOrder[]
}

export interface FoodOrder {
  id: string;
  name: string;
  price: number;
  orderNum: number;
  foodId: string;
}
