export type CreateOrderInput = {
  attendanceId: string;
  notes?: string;
  items: Array<{
    productId: string;
    quantity: number;
    notes?: string;
  }>;
};

export type OrderItemResponse = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: string;
  notes: string | null;
};

export type OrderResponse = {
  id: string;
  attendanceId: string;
  notes: string | null;
  items: OrderItemResponse[];
};

import { API_URL } from "./api";


const PRINT_URL = import.meta.env.VITE_PRINT_URL ?? "http://192.168.10.6:9101";

export const CURRENT_ATTENDANCE_ID = "1";

export async function createOrder(input: CreateOrderInput): Promise<OrderResponse> {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Não foi possível enviar o pedido");
  }

  return response.json();
}

export type PrintItemInput = {
  name: string;
  quantity: number;
  notes?: string;
};

export type PrintOrderInput = {
  orderId: string;
  tableId: string;
  notes?: string;
  items: PrintItemInput[];
};

export async function printOrder(input: PrintOrderInput): Promise<void> {
  const response = await fetch(`${PRINT_URL}/print`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Não foi possível imprimir o pedido");
  }
}