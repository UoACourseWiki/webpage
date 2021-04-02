import { init as AccountInit } from "./account/router";
import { init as ReviewInit } from "./review/router";
import { init as SearchInit } from "./search/router";

import { init as SettingInit } from "./setting/router";
import { init as SubjectInit } from "./subject/router";

function InitRouters() {
  return (
    <div>
      <AccountInit />
      <ReviewInit />
      <SearchInit />
      <SettingInit />
      <SubjectInit />
    </div>
  );
}

export { InitRouters };
