import {PageConfiguration} from "../page/page.config";

export class AppConfiguration {
  constructor(public defaultLanding: string, public pages: Record<string, PageConfiguration>) {
  }
}
