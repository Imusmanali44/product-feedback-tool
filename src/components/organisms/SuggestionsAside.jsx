import { PropTypes } from "prop-types";

import AppInfo from "./AppInfo";
import Tags from "./Tags";

const SuggestionsAside = ({ getActiveTag }) => {
  return (
    <aside className="suggestions__aside">
      <AppInfo />
      <Tags getActiveTag={getActiveTag} />
    </aside>
  );
};

SuggestionsAside.propTypes = {
  getActiveTag: PropTypes.func.isRequired,
};

export default SuggestionsAside;
