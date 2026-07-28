export interface Filter {
  departmentCategories: DepartmentCategory[] | undefined;
  clothingCategories: ClothingCategory[] | undefined;
  colorCategories: ColorCategory[] | undefined;
  minimumPrice: number | undefined;
  maximumPrice: number | undefined;
  sortStrategy: SortStrategy | undefined;
  onlyDiscounted: boolean | undefined;
}

export const ClothingCategory = {
  Jean: 'JEAN',
  Pant: 'PANT',
  Short: 'SHORT',
  Shirt: 'SHIRT',
  Sweater: 'SWEATER',
  Bag: 'BAG',
  Shoes: 'SHOES',
  Hat: 'HAT',
  Other: 'OTHER',
} as const;
export type ClothingCategory = (typeof ClothingCategory)[keyof typeof ClothingCategory];

export const ColorCategory = {
  Black: 'BLACK',
  Gray: 'GRAY',
  White: 'WHITE',
  Red: 'RED',
  Blue: 'BLUE',
  Yellow: 'YELLOW',
  Green: 'GREEN',
  Purple: 'PURPLE',
  Other: 'OTHER',
} as const;
export type ColorCategory = (typeof ColorCategory)[keyof typeof ColorCategory];

export const DepartmentCategory = {
  Mens: 'MENS',
  Womens: 'WOMENS',
  Other: 'OTHER',
} as const;
export type DepartmentCategory = (typeof DepartmentCategory)[keyof typeof DepartmentCategory];

export const SortStrategy = {
  Newest: 'NEWEST',
  Oldest: 'OLDEST',
  NameAscending: 'NAME_ASCENDING',
  NameDescending: 'NAME_DESCENDING',
  PriceAscending: 'PRICE_ASCENDING',
  PriceDescending: 'PRICE_DESCENDING',
  DiscountAscending: 'DISCOUNT_ASCENDING',
  DiscountDescending: 'DISCOUNT_DESCENDING',
} as const;
export type SortStrategy = (typeof SortStrategy)[keyof typeof SortStrategy];
