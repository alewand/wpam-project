import { BARCODE_LENGTHS } from "../../../constants/constants";

export const isBarcodeValid = (barcode: string): boolean => {
  return BARCODE_LENGTHS.includes(barcode.length);
};
