import AsyncSelect from "react-select/async";
import { loadOptions } from "./networkHandler";

export default function SearchPage() {
  return (
    <AsyncSelect
      placeholder="Type a Subject or CourseId ..."
      loadOptions={loadOptions}
    />
  );
}
