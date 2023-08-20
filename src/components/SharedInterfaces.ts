// de_DE, en_GB, en_US, etc
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
// KEY, VALUE
interface KeyValuePair {
  key: string;
  value: string;
}
// ID, KEY, NAME
export interface IKNCommon {
  id: number;
  key: { href: string };
  name: string;
}
// ID, KEY, NAME, REALM
interface IKNRealm extends IKNCommon {
  realm: IKNRealmSlug;
}
// ID, KEY, NAME, SLUG
interface IKNRealmSlug extends IKNCommon {
  slug: string;
}
// NAME, TYPE
interface NameTypePair {
  name: Regions;
  type: string;
}
// COMPLETED_COUNT, ENCOUNTER, LAST_KILL_TIMESTAMP
interface BossEncounter {
  completed_count: number;
  encounter: IKNCommon;
  last_kill_timestamp: number;
}
// COMPLETED_COUNT, ENCOUNTERS, TOTAL_COUNT
interface InstanceProgress {
  completed_count: number;
  encounters: BossEncounter[];
  total_count: number;
}
// DIFFICULTY, PROGRESS, STATUS
export interface InstanceMode {
  difficulty: NameTypePair;
  progress: InstanceProgress[];
  status: NameTypePair;
}
// INSTANCE, MODES
interface Instance {
  instance: IKNCommon;
  modes: InstanceMode[];
}
// EXPANSION, INSTANCE
export interface Expansion {
  expansion: IKNCommon;
  instances: Instance[];
}

export interface CharacterRaids {
  character: IKNRealm;
  expansions: Expansion[];
  _links: { self: { href: string } };
}

export interface CharacterMedia {
  assets: KeyValuePair[];
  character: IKNRealm;
  _links: { self: { href: string } };
}

export interface CharacterProfile {
  achievement_points: number;
  achievements: { href: string };
  achievements_statistics: { href: string };
  active_spec: IKNCommon;
  active_title: IKNCommon;
  appearance: { href: string };
  average_item_level: number;
  character_class: IKNCommon;
  collections: { href: string };
  /* covenant_progress */
  encounters: { href: string };
  equipment: { href: string };
  equipped_item_level: number;
  experience: number;
  faction: NameTypePair;
  gender: NameTypePair;
  id: number;
  last_login_timestamp: number;
  level: number;
  media: { href: string };
  mythic_keystone_profile: { href: string };
  name: string;
  professions: { href: string };
  pvp_summary: { href: string };
  quests: { href: string };
  race: IKNCommon;
  realm: IKNRealmSlug;
  reputations: { href: string };
  specializations: { href: string };
  statistics: { href: string };
  titles: { href: string };
  _links: { self: { href: string } };
}
