export interface Menu {
  tableNum: number;
  orderPerson: string;
  orders: FoodOrders[]
}

export interface FoodOrders {
  name: string;
  price: number;
  orderNum: number;
  foodNum: number;
}
