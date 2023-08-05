interface KeyHref {
  href: string;
}
interface RealmObject {
  id?: number;
  key: KeyHref;
  slug: string;
  name?: Regions;
}
interface CharacterAsset {
  id: number;
  key: KeyHref;
  name: string;
  realm: RealmObject;
}
interface Regions {
  de_DE: string;
  en_GB: string;
  en_US: string;
  es_ES: string;
  es_MX: string;
  fr_FR: string;
  it_IT: string;
  ko_KR: string;
  pt_BR: string;
  ru_RU: string;
  zh_CN: string;
  zh_TW: string;
}
interface CharacterMediaAsset {
  key: string;
  value: string;
}

// not required because we can be empty after an unsuccessful API call
export interface CharacterMedia {
  assets?: CharacterMediaAsset[];
  character?: CharacterAsset;
  _links?: { self: KeyHref };
}
