export interface Menu {
    id: string;
    tableNum: string;
    timestamp: string;
    orderPerson: string;
    totalPrice: number;
    orders: FoodOrder[]
}

export interface FoodOrder {
    name: string;
    price: number;
    orderNum: number;
    id: string;
}

export interface Table {
  id: string;
  value: string;
}
