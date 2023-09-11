import { Item } from './item';

export interface Bill {
  id: number;
  customerName: string;
  phoneNumber: number;
  email: string;
  items: Item[];
  billAmount: number;
}
