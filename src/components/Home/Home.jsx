import Header from "../Header/Header";
import "./Home.scss";
import jobsThumbnail from "../../assets/apps-images/jobs-app-removebg-preview.png";
import coursesThumbnail from "../../assets/apps-images/courses2app.png";
import shopThumbnail from "../../assets/apps-images/shop2app.png";
import todoThumbnail from "../../assets/svg/svg-app-images/todoApp.svg";
import clockAndCalendarMP4 from "../../assets/animatedImages/calendarClockAnimated-unscreen.gif";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const cardsArray = [
    {
      cardTitle: "Jobs",
      CardImg: jobsThumbnail,
    },
    {
      cardTitle: "Courses",
      CardImg: coursesThumbnail,
    },
    {
      cardTitle: "Shop",
      CardImg: shopThumbnail,
    },
    {
      cardTitle: "Todo",
      CardImg: todoThumbnail,
    },
    {
      cardTitle: "Clock & Calendar",
      CardImg: clockAndCalendarMP4
    }
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

  return (
    <>
      <Header />
      <section className="cfh-home-section">
        <div className="cfh-cards-container">
          {cardsArray.map((card, index) => (
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
                  src={card.CardImg}
                  alt={card.cardTitle}
                  className="card-image"
                  tabIndex={0}
                />
                <div
                  className="card-title"
                  tabIndex={0}
                >
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
