
import { OutboundItem } from './template-structure';

export function generateMockOutboundData(count: number = 5): OutboundItem[] {
  return Array(count).fill(null).map((_, index) => ({
    customerId: `CUST-${1000 + index}`,
    consignee: `Company ${String.fromCharCode(65 + index)}`,
    contactPerson: `Contact ${index + 1}`,
    telephone: `+1-555-${String(1000 + index).padStart(4, '0')}`,
    deliveryAddress: `${index + 1} Business Ave, Suite ${100 + index}`,
    salesOrderNo: `SO-${2025}-${1000 + index}`,
    productBarcode: `BAR-${10000 + index}`,
    customerSku: `CSK-${2000 + index}`,
    description: `Premium Product ${index + 1}`,
    orderQuantity: Math.floor(Math.random() * 50) + 10,
    shipQuantity: Math.floor(Math.random() * 40) + 10,
    transportBy: ['Air', 'Sea', 'Land'][index % 3],
    etd: new Date(2025, 3, 15 + index).toISOString().split('T')[0],
    eta: new Date(2025, 3, 20 + index).toISOString().split('T')[0],
    shippingDate: new Date(2025, 3, 14 + index).toISOString().split('T')[0],
    productSnControl: `SN-CTRL-${index + 1}`,
    consumables1: `Package Contents ${index + 1}`,
    consumables2: `Additional Items ${index + 1}`
  }));
}
