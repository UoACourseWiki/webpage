import { axios732, HTTP_OK } from "../utils/Macro";

const URLPath = "/Courses";
const queryKey = "search";

const loadOptions = async (inputValue, callback) => {
  if (!inputValue || inputValue.length === 0) {
    return;
  }

  // HTTP Request
  const searchParams = {};
  searchParams[queryKey] = inputValue;

  await axios732.get(URLPath, { params: searchParams }).then(
    (res) => {
      var items = parseSubjectResBody(res.data);
      callback(items);
    },
    (err) => {
      const res = err.response;
      const errmsg = "🥺 " + res.data.title;
      callback([{ label: errmsg, status: res.status }]);
    }
  );
};

const showCnt = 8;
const linkPrefix = "/course";
function parseSubjectResBody(data) {
  return data
    .map((course) => {
      var ctlgNbr = course.catalogNbr;
      var sbjt = course.subject;

      var courseKey = sbjt + "-" + ctlgNbr;
      var linkPath = `${linkPrefix}/${courseKey.toLowerCase()}`;

      return { label: courseKey, value: linkPath, status: HTTP_OK };
    })
    .slice(0, showCnt);
}

export { loadOptions, HTTP_OK };
