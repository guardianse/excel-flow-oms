
export const outboundTemplateFields = [
  "Customer ID",
  "Consignee/Customer",
  "Contact person",
  "Telephone",
  "Delivery address",
  "Sales order No.",
  "Seller Product Barcode",
  "Customer SKU",
  "Description",
  "Oder Q'ty",
  "Ship Q'ty",
  "Transport by",
  "E.T.D",
  "E.T.A",
  "Shipping order date",
  "Product SN# control",
  "Consumables 1",
  "Consumables 2"
] as const;

export interface OutboundItem {
  customerId: string;
  consignee: string;
  contactPerson: string;
  telephone: string;
  deliveryAddress: string;
  salesOrderNo: string;
  productBarcode: string;
  customerSku: string;
  description: string;
  orderQuantity: number;
  shipQuantity: number;
  transportBy: string;
  etd: string;
  eta: string;
  shippingDate: string;
  productSnControl: string;
  consumables1: string;
  consumables2: string;
}
