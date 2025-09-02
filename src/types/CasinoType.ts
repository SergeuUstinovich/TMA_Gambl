export interface CasinoType {
  user: UserType;
  legend_of_casino: LegendCasino[];
  bonus_for_casino: BonusType[];
  peoples_top: CasinoCardType[];
  top_10_casino: CasinoCardType[];
  offers_of_week: CasinoCardType[];
  banners: BannerType[];
  big_win: BigWinType[];
}

export interface BigWinType {
  chance: ChanceType;
  casino: GameCasinoType[];
  id: number;
  name: string;
  picture: {
    image_url: string;
  };
}

export interface BannerType {
  id: number;
  image: string;
  name: string;
  chance: ChanceType;
  casino: GameCasinoType[];
  button_text: string;
  description: string;
  picture_x2: {
    image_url: string;
  };
  only_link: boolean;
  link_for_button: string | null;
}

interface GameCasinoType {
  casino: {
      logo_url: string;
      name: string;
  }
  id: number;
  link: string;
  name_game: string;
}

interface ChanceType {
  id: number;
  color: string;
  text: string;
  color_text: string;
  description: string;
}

interface UserType {
  tg_id: string;
  tg_name: string;
  set_sign: boolean;
  count_of_session: number;
  token_money: number;
  ai_push_trigger: boolean;
  push_trigger: boolean;
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
