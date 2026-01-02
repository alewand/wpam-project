export const MAX_GRAMS = 10000;
export const DEFAULT_GRAMS = 100;

export const EAN13_LENGTH = 13;
export const EAN8_LENGTH = 8;

export const VALID_BARCODE_LENGTHS = [EAN13_LENGTH, EAN8_LENGTH] as const;

export const isValidBarcodeLength = (length: number): boolean => {
  return VALID_BARCODE_LENGTHS.includes(length as (typeof VALID_BARCODE_LENGTHS)[number]);
};
