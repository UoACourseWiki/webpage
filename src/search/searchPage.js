import AsyncSelect from "react-select/async";
import { useHistory } from "react-router-dom";
import { loadOptions, HTTP_OK } from "./networkHandler";

export default function SearchPage() {
  let history = useHistory();
  const loadingMsg = "🔍 Searching ...";

  return (
    <AsyncSelect
      placeholder="Type a Subject or CourseId ..."
      loadingMessage={() => {
        return loadingMsg;
      }}
      loadOptions={loadOptions}
      onChange={(item) => {
        if (item.status !== HTTP_OK) {
          return;
        }

        history.push(item.value);
      }}
    />
  );
}
