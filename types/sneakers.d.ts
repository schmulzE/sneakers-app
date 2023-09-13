declare interface Sneakers {
  id: number;
  gender?:string;
  availableSize?: null | number;
  promotionalLabel?: string;
  size?: number;
  quantity?: number;
  stockTotal?: number;
  isCustomizable?: boolean;
  isForMember?: boolean;
  shortDescription?: string
  type?: string;
  product?: string
  brand?: Brand;
  priceInfo?: PriceInfo;
  images?: Images;
  properties?: {
    rankingTrackingId: string;
  };
  category?: string;
}

interface Images {
  cutOut: string;
  all: string[];
  model: string;
}
interface Brand {
  id: number;
  name: string;
}

interface PriceInfo {
  formattedFinalPrice: string,
  formattedInitialPrice: string,
  finalPrice: number,
  initialPrice: number,
  currencyCode: string,
  isOnSale: boolean,
  discountLabel : null,
  installmentsLabel: null
}