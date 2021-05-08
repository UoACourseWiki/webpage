import { axios732, HTTP_OK } from "../utils/Macro";

const APIPath = "/Courses";
const queryKey = "search";

const loadOptions = async (inputValue, callback) => {
  if (!inputValue || inputValue.length === 0) {
    return;
  }

  // HTTP Request
  const searchParams = {};
  searchParams[queryKey] = inputValue;

  await axios732.get(APIPath, { params: searchParams }).then(
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
  var subjects = new Set();

  var cItmes = data.map((course) => {
    var sbjt = course.subject;
    subjects.add(sbjt);

    var ctlgNbr = course.catalogNbr;
    var courseKey = sbjt + "-" + ctlgNbr;
    var linkPath = `${linkPrefix}/${sbjt}/${ctlgNbr}`;

    return { label: courseKey, value: linkPath, status: HTTP_OK };
  });

  // shuffle items for display
  cItmes = cItmes.sort((a, b) => 0.5 - Math.random()).slice(0, showCnt);

  // add subject entry
  var sItems = Array.from(subjects)
    .map((s) => {
      var linkPath = `${linkPrefix}/${s}`;
      return { label: s, value: linkPath, status: HTTP_OK };
    })
    .slice(0, 2);

  return sItems.concat(cItmes);
}

export { loadOptions, HTTP_OK };
