import axios from "axios";

const baseURL = "/Courses";
const quearKey = "search";

const loadOptions = async (inputValue, callback) => {
  if (!inputValue || inputValue.length === 0) {
    return;
  }

  // HTTP Request
  const searchParams = {};
  searchParams[quearKey] = inputValue;

  await axios.get(baseURL, { params: searchParams }).then(
    (res) => {
      var items = parseResBody(res.data);
      callback(items);
    },
    (err) => {
      const res = err.response;
      callback([{ label: "🥺 " + res.statusText, value: res.status }]);
    }
  );
};

const showCnt = 8;
function parseResBody(data) {
  return data
    .map((course) => {
      var ctlgNbr = course.catalogNbr;
      var sbjt = course.subject;

      var courseKey = sbjt + "-" + ctlgNbr;
      var link = "/" + courseKey;

      return { label: courseKey, value: link };
    })
    .slice(0, showCnt);
}

export { loadOptions };
