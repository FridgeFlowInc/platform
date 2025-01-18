import pako from 'pako'
import { Product } from '../data/schema'

const stringMap: Record<string, number> = {
  name: 1,
  category: 2,
  manufacturer: 3,
  quantity: 4,
  unit: 5,
  nutritional_value: 6,
  total_net_weight: 7,
  total_gross_weight: 8,
  manufacture_date: 9,
  expiration_date: 10,
  notes: 11,
  allergens: 12,
}

export function compressProduct(product: Omit<Product, 'id'>): string {
  const compressedObj = Object.entries(product).reduce(
    (acc, [key, value]) => {
      if (value !== null && value !== undefined) {
        acc[stringMap[key] || key] = value
      }
      return acc
    },
    {} as Record<string | number, any>
  )

  const jsonString = JSON.stringify(compressedObj)
  const uint8Array = new TextEncoder().encode(jsonString)

  const compressed = pako.deflate(uint8Array)

  return btoa(String.fromCharCode.apply(null, compressed))
}

export function decompressProduct(
  compressedString: string
): Omit<Product, 'id'> {
  const compressedData = new Uint8Array(
    atob(compressedString)
      .split('')
      .map((char) => char.charCodeAt(0))
  )

  const decompressed = pako.inflate(compressedData)

  const jsonString = new TextDecoder().decode(decompressed)
  const decompressedObj = JSON.parse(jsonString)

  const reverseStringMap = Object.entries(stringMap).reduce(
    (acc, [key, value]) => {
      acc[value] = key
      return acc
    },
    {} as Record<number, string>
  )

  return Object.entries(decompressedObj).reduce(
    (acc, [key, value]) => {
      acc[reverseStringMap[key as any] || key] = value
      return acc
    },
    {} as Omit<Product, 'id'>
  )
}
