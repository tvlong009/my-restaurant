export interface Menu {
  tableNum: number;
  orders: FoodOrders[]
}

interface FoodOrders {
  name: '';
  orderNum: number;
  foodNum: number;
}
