export interface IBaseItem {
  ide?: number;
  title?: string;
  image?: string;
  price?: number;
  link?: string;
}

export interface ISearchOption {
  search: string;
  locations: string[];
}

export interface IExtraData {
  quantity: number;
  query: string;
  locations: string[];
}
