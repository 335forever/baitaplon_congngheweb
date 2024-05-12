import axios from "axios";

export async function getSearchSuggestions({ search }, onResolve, onReject) {
  try {
    const response = await axios.get(process.env.SEARCH_API_ENDPOINT, {
      params: {
        output: "toolbar",
        hl: "vi",
        q: search,
        gl: "vn",
      },
      headers: {
        "Content-Type": "application/xml"
      }
    });
    if (response.status === 200) {
      const results = new DOMParser().parseFromString(response.data, 'application/xml').getElementsByTagName("suggestion");
      onResolve([...results].map(e => e.getAttribute("data")));
    } else onReject(response);
  } catch (err) {
    onReject(err);
  }
}
