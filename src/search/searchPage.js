import AsyncSelect from "react-select/async";
import { loadOptions, HTTP_OK } from "./networkHandler";

export default function SearchPage() {
  const loadingMsg = "🔍 Searching ...";

  return (
    <AsyncSelect
      placeholder="Search a Subject or CourseId ..."
      loadingMessage={() => {
        return loadingMsg;
      }}
      loadOptions={loadOptions}
      onChange={(item) => {
        if (item.status !== HTTP_OK) {
          return;
        }

        window.location.href = item.value;
      }}
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
    />
  );
}
