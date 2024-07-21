import { useState } from "react";
import Header from "../Header/Header";
import "./Home.scss";
import jobsThumbnail from "../../assets/apps-images/jobs-app-removebg-preview.png";
import coursesThumbnail from "../../assets/apps-images/courses2app.png";
import shopThumbnail from "../../assets/apps-images/shop2app.png";
import todoThumbnail from "../../assets/svg/svg-app-images/todoApp.svg";
import clockAndCalendarMP4 from "../../assets/animatedImages/calendarClockAnimated-unscreen.gif";
import weatherVideoGif from "../../assets/animatedImages/weather.gif";
import RecipeImage from "../../assets/apps-images/recipe.bg.png";
import NewsAnimation from "../../assets/animatedImages/NewsAnimation.gif";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const cardsArray = [
    {
      cardTitle: "Jobs",
      CardImage: jobsThumbnail,
    },
    {
      cardTitle: "Courses",
      CardImage: coursesThumbnail,
    },
    {
      cardTitle: "Shop",
      CardImage: shopThumbnail,
    },
    {
      cardTitle: "Todo",
      CardImage: todoThumbnail,
    },
    {
      cardTitle: "Clock & Calendar",
      CardImage: clockAndCalendarMP4,
    },
    {
      cardTitle: "Weather",
      CardImage: weatherVideoGif,
    },
    {
      cardTitle: "Recipe Book",
      CardImage: RecipeImage,
    },
    {
      cardTitle: "News",
      CardImage: NewsAnimation,
    },
  ];

  const handleNavigate = (cardTitle) => {
    switch (cardTitle) {
      case "Jobs":
        navigate("/jobs");
        break;
      case "Courses":
        navigate("/courses");
        break;
      case "Shop":
        navigate("/cfh-shop");
        break;
      case "Clock & Calendar":
        navigate("/calendar");
        break;
      case "Todo":
        navigate("/todo");
        break;
      default:
        navigate("/page-not-found");
        break;
    }
  };

  const handleKeyDown = (event, cardTitle) => {
    if (event.key === "Enter") {
      handleNavigate(cardTitle);
    }
  };

  const filteredCards = cardsArray.filter((card) =>
    card.cardTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header />
      <section className="cfh-home-section">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input d-none"
        />
        <div className="cfh-cards-container">
          {filteredCards.map((card, index) => (
            <div
              className="card-container"
              key={index}
              onClick={() => handleNavigate(card.cardTitle)}
            >
              <div
                className="card"
                tabIndex={0}
                onKeyDown={(event) => handleKeyDown(event, card.cardTitle)}
              >
                <img
                  src={card.CardImage}
                  alt={card.cardTitle}
                  className="card-image"
                  tabIndex={0}
                />
                <div className="card-title" tabIndex={0}>
                  {card.cardTitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
