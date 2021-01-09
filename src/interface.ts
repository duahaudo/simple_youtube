export interface ISetting {
  maxResults: number;
  autoplay: boolean;
  loop: boolean;
}

export interface IContextSetting {
  setting: ISetting;
  setSetting: Function;
}