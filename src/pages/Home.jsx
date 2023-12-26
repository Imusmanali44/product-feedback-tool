import { PropTypes } from "prop-types";
import { useState, useEffect } from "react";

import MobileNavigation from "../components/organisms/MobileNavigation";
import SuggestionsAside from "../components/organisms/SuggestionsAside";
import SuggestionsContent from "../components/organisms/SuggestionContent";
import { getDatabase, onValue, ref } from "firebase/database";
import { app } from "../Firebase";

function Home({ sharedProps }) {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [feedbackItemsToShow, setFeedbackItemsToShow] = useState([]);
  const [sortByCriteria, setSortByCriteria] = useState("Most Upvotes");

  const [activeTagCategory, setActiveTagCategory] = useState(null);

  const [mobileSideMenuOpen, setMobileSideMenuOpen] = useState(false);

  function showHideSideMenu(hamburgerButtonIsVisible) {
    if (hamburgerButtonIsVisible) setMobileSideMenuOpen(true);
    else setMobileSideMenuOpen(false);
  }

  // Filter with product tag
  function showTagFeedbackItems(tagName) {
    if (feedbackItems) {
      if (tagName !== "All") {
        const tagFeedbackItems = feedbackItems.filter(
          (item) => item.category === tagName
        );

        setFeedbackItemsToShow(sortBy(tagFeedbackItems, sortByCriteria));
        setActiveTagCategory(tagName);
      } else {
        setFeedbackItemsToShow(sortBy(feedbackItems, sortByCriteria));
        setActiveTagCategory("All");
      }
    }
  }

  function sortFeedbackItems(sortByCriteria) {
    setSortByCriteria(sortByCriteria);
  }

  // sorting
  function sortBy(items, criteria) {
    const sortedByUpvotes = items.sort(
      (item1, item2) => item2.upvotes - item1.upvotes
    );

    switch (criteria) {
      case "Least Upvotes":
        return sortedByUpvotes.reverse();
      case "Most Comments":
        return items.sort(
          (item1, item2) => item2.comments?.length - item1.comments?.length
        );

      case "Least Comments":
        return items
          .sort(
            (item1, item2) => item2.comments?.length - item1.comments?.length
          )
          .reverse();

      default:
        return sortedByUpvotes;
    }
  }

  // when criteria sorting change
  useEffect(() => {
    const sortedFeedbackItems = sortBy(
      [...feedbackItemsToShow],
      sortByCriteria
    );

    setFeedbackItemsToShow(sortedFeedbackItems);
  }, [sortByCriteria]);

  // get FeedBack Items
  useEffect(() => {
    const db = getDatabase(app);
    const feedbackRef = ref(db, "feedback");

    onValue(feedbackRef, (snapshot) => {
      const feedbackData = snapshot.val();
      if (feedbackData) {
        const feedbackArray = Object.keys(feedbackData).map((key) => ({
          id: key,
          ...feedbackData[key],
        }));

        setFeedbackItems(feedbackArray);
      } else {
        setFeedbackItemsToShow([]);
      }
    });
  }, []);

  // when items Update
  useEffect(() => {
    setFeedbackItemsToShow(sortBy([...feedbackItems], sortByCriteria));
    if (activeTagCategory)
      setFeedbackItemsToShow(
        feedbackItems.filter((item) => item.category === activeTagCategory)
      );
  }, [feedbackItems]);

  return (
    <div
      className={
        mobileSideMenuOpen ? "suggestions--scroll-lock" : "suggestions"
      }
    >
      {sharedProps.isMobileScreen ? (
        <MobileNavigation
          isMobileScreen={sharedProps.isMobileScreen}
          showHideSideMenu={showHideSideMenu}
          getActiveTag={showTagFeedbackItems}
          feedbackItems={feedbackItemsToShow}
          mobileSideMenuOpen={mobileSideMenuOpen}
        />
      ) : (
        <SuggestionsAside getActiveTag={showTagFeedbackItems} />
      )}

      <SuggestionsContent
        isMobileScreen={sharedProps.isMobileScreen}
        feedbackItems={feedbackItemsToShow}
        getSortByCriteria={sortFeedbackItems}
        getSelectedFeedbackItemId={sharedProps.showFeedbackItemDetail}
        sharedProps={sharedProps}
        mobileSideMenuOpen={mobileSideMenuOpen}
      />
    </div>
  );
}

Home.propTypes = {
  sharedProps: PropTypes.object,
};

export default Home;
