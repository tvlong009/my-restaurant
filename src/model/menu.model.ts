export interface Menu {
    id: string;
    table: string;
    timestamp: string;
    userId: string;
    total: number;
    show: boolean;
    icon: string;
    foodList: any[]
}

export interface FoodOrder {
    name: string;
    price: number;
    id: string;
}

export interface Table {
  id: string;
  value: string;
}
