import {AppConfiguration} from "../app-configuration";
import {demo_obs_created_by_parent_page_conf} from "./demo_obs_created_by_parent_page";

export const mock_config = new AppConfiguration({
  defaultLanding: "demo_obs_created_by_parent",
  pages: {
    "demo_obs_created_by_parent": demo_obs_created_by_parent_page_conf
  }
})
