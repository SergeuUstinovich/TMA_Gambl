export interface CasinoType {
  user: UserType;
  legend_of_casino: LegendCasino[];
  bonus_for_casino: BonusType[];
  peoples_top: CasinoCardType[];
  top_10_casino: CasinoCardType[];
  offers_of_week: CasinoCardType[];
}

interface UserType {
  tg_id: string;
  tg_name: string;
  set_sign: boolean;
  count_of_session: number;
  token_money: number;
}

export interface CasinoCardType {
  name: string;
  rating: number;
  free_spin: number;
  dep: number;
  money: number;
  url: string;
  count_of_visit_people: number;
  promo_code: string;
  logo_url: string;
  banner_url?: string;
  descriptions?: string;
  id: number;
}

export interface CasinoScheme {
  casino?: CasinoType;
}

export interface BonusType {
  casino: CasinoCardType;
  id: number;
  place: number;
}

export interface LegendCasino {
  bonus_for_casino: BonusType[];
  id: number;
  image: string;
  name: string;
  place: number;
}
