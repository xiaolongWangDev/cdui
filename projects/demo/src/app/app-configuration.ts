import {PageConfiguration} from "configuration-driven-core";

export class AppConfiguration {
  public readonly defaultLanding: string;
  public readonly pages: Record<string, PageConfiguration>;
  constructor(args: Readonly<AppConfiguration>) {
    Object.assign(this, args);
  }
}
