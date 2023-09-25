type PrimitivePropertie = string | number | boolean | null;
export type TJsonValue = PrimitivePropertie | TJsonDocument | List;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface List extends Array<TJsonValue> {}

export interface TJsonDocument {
  [member: string]: TJsonValue;
}
