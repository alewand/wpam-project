export const ACCESS_TOKEN_EXPIRY_MINUTES = 1;
export const REFRESH_TOKEN_EXPIRY_DAYS = 7;

export const ACCESS_TOKEN_ISS = "calories-app";

export const SALT_ROUNDS = 12;

export const OFF_API = "https://world.openfoodfacts.org/api/v2/product/";

export const OFF_API_FIELDS = ["product_name", "code", "nutriments", "brands"];
export const OFF_API_FIELDS_STRING = OFF_API_FIELDS.join(",");

export const REQUIRED_NUTRIENTS = [
  "energy-kcal_100g",
  "proteins_100g",
  "fat_100g",
  "carbohydrates_100g",
];

export const BARCODE_LENGTH = 13;

export const REFRESH_PRODUCTS_WITH_BARCODE_DAYS = 7;
