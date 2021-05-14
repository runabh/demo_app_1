import porfilepic from "./profile.png";
// import video from "./1-Favorite-Things-Emily-V16.mov";
import Overlay from "react-overlays/Overlay";
import { useState, useRef, useEffect } from "react";
import "./style.css";
import {
  HeartOutlined,
  ShareAltOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { Transition } from "react-transition-group";
import FadeIn from "react-fade-in";
import VideoPlayer from "./VideoPlayer";

const duration = 2500;

const defaultStyle = {
  display: "grid",
  gridTemplateColumns: "50px 200px 80px",
  backgroundColor: "#00000050",
  borderRadius: "40px",
  alignItems: "center",
  margin: "16px auto",
};

const transitionStyles = {
  entering: {
    opacity: 0.5,
    transform: "scale(1)",
    transition: `opacity 500ms ease-in-out transform 500ms`,
  },
  entered: {
    opacity: 1,
    transform: "scale(1.5)",
    transition: `opacity 500ms ease-in-out transform 500ms`,
  },
  exiting: {
    opacity: 0.5,
    transform: "scale(0.7)",
    transition: `opacity 500ms ease-in-out transform 500ms`,
  },
  exited: {
    opacity: 0.5,
    transform: "scale(0.5)",
    transition: `opacity 500ms ease-in-out transform 500ms`,
  },
};

const OverlayVideo = (props) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const [currentPlayerTime, setCurrentPlayerTime] = useState(0);
  const [liked, setLiked] = useState(false);
  const [selected, setSelected] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  const list = [
    {
      id: 1,
      name: "Organic Hair Rinse",
      price: "$25.05",
      type: "Sky Blue Coeus",
      image:
        "https://cdn.shopify.com/s/files/1/0519/2391/0810/products/IMG_1322-scaled.jpg?v=1620016340",
      start: 3,
    },
    {
      id: 2,
      name: "Complete Pore Vanishing Primer",
      price: "$17.71",
      type: "Black Eucalyptus",
      image:
        "https://cdn.shopify.com/s/files/1/0519/2391/0810/products/CFP03.jpg?v=1619698649",
      start: 15,
    },
    {
      id: 3,
      name: "Apricot Tank Top",
      price: "$26.15",
      type: "Teal Demeter",
      image:
        "https://cdn.shopify.com/s/files/1/0519/2391/0810/products/Apricot_Spaghetti_Strap_Buttoned_Tank_Top_3.jpg?v=1620016683",
      start: 29,
    },
    {
      id: 4,
      name: "Crepe Cold Shoulder Maxi Dress",
      price: "$106.34",
      type: "Glow Road",
      image:
        "https://cdn.shopify.com/s/files/1/0519/2391/0810/products/1579509614023_WhatsApp_Image_2020-01-20_at_13.28.27-originnm80prcnt.jpg?v=1620015851",
      start: 43,
    },
    {
      id: 5,
      name: "100% Pure Virgin Neem Oil ",
      price: "$221.43",
      type: "Yellow Poppy",
      image:
        "https://cdn.shopify.com/s/files/1/0519/2391/0810/products/il_570xN.1058575265_9bxk.jpg?v=1619698651",
      start: 55,
    },
    {
      id: 6,
      name: "CREAM TO POWDER BLUSH",
      price: "$19.14",
      type: "White Pontus",
      image:
        "https://cdn.shopify.com/s/files/1/0519/2391/0810/products/22312_CREAM_TO_POWDER_NATURAL_ROSE.jpg?v=1619698648",
      start: 69,
    },
  ];
  const firstHostpot = 3;

  // const rotateAr = () => {
  //   const newAr = [...list];
  //   let last = newAr.pop();
  //   newAr.unshift(last);
  //   setList(newAr);
  // };

  const checkIfShouldRotate = (currentTime) => {
    const currentItem = list.find((element, index) => {
      return (
        element.start <= currentTime &&
        ((index === list.length - 1 && list[index - 1].start < currentTime) ||
          list[index + 1].start > currentTime)
      );
    });
    // const nextItem = list[list.length - 2];

    if (
      currentItem &&
      ((activeItem && currentItem.id !== activeItem.id) || !activeItem)
    ) {
      console.log(
        "Current time: ",
        Math.floor(currentTime),
        "Current Item: ",
        currentItem.name,
        "Active Item: ",
        activeItem
      );
      setActiveItem(currentItem);
    }
    // if (
    //   currentTime > currentItem.start &&
    //   Math.floor(currentTime) === nextItem.start
    // ) {
    //   // rotateAr();
    // }
  };

  // const Card = ({ item }) => {
  //   console.log("Called");
  //   // const isActive =
  //   //   index === length - 1 &&
  //   //   currentPlayerTime >= firstHostpot &&
  //   //   currentPlayerTime < item.start + 10 &&
  //   //   currentPlayerTime >= item.start;
  //   return (
  //     // <Transition
  //     //   in={item && currentPlayerTime > item.start}
  //     //   timeout={duration}
  //     // >
  //     //   {(state) => (

  //     //   )}
  //     // </Transition>
  //   );
  // };

  const creatorDetails = {
    name: "EMILY DIDONATO",
    videoTitle: `Emily DiDonato's 10 Favorite Things On-Set with SI SWIM`,
    totalProducts: 10,
    views: "43.4K",
    likes: "25.6K",
  };
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    sources: [
      {
        src: video,
        type: "video/mp4",
      },
    ],
    onTimeUpdate: (currentTime) => {
      setCurrentPlayerTime(Math.floor(currentTime));
      checkIfShouldRotate(currentTime);
    },
  };
  return (
    <div>
      <div className="video-container">
        <video
          ref={target}
          controls
          autoplay
          onTimeUpdate={(e) => {
            setCurrentPlayerTime(Math.floor(e.target.currentTime));
            checkIfShouldRotate(e.target.currentTime);
          }}
          onLoadedMetadata={(e) => {
            console.log(Math.floor(e.target.duration));
          }}
        >
          <source
            src={
              "https://nowwith-talent-poc.s3.amazonaws.com/1-Favorite-Things-Emily-V16.mov"
            }
            type="video/mp4"
          />
        </video>
        <div className="interaction">
          <div className="interaction-layer-top">
            <div className="video-details">
              <div>
                <img src={porfilepic} />
              </div>
              <div className="creator-details">
                <div>{creatorDetails.name}</div>
                <div>{creatorDetails.videoTitle}</div>
                <div className="stats">
                  <span>{creatorDetails.totalProducts} PRODUCTS</span>
                  <span>{creatorDetails.views} VIEWS</span>
                  <span>{creatorDetails.likes} LIKES</span>
                </div>
              </div>
            </div>
            <div className="video-actions">
              <div>
                {liked ? (
                  <HeartFilled
                    style={{ color: "red" }}
                    onClick={() => setLiked(false)}
                  />
                ) : (
                  <HeartOutlined color="#fff" onClick={() => setLiked(true)} />
                )}
              </div>
              <div>
                <ShareAltOutlined color="#fff" />
              </div>
            </div>
          </div>
          <div className="card-container">
            {activeItem && currentPlayerTime > activeItem.start && (
              // <FadeIn
              //   transitionDuration={800}
              //   visible={
              //     !(activeItem && currentPlayerTime - activeItem.start <= 0.5)
              //   }
              // >
              <div
                onClick={() => {
                  setSelected(activeItem);
                }}
                className="card"
              >
                {" "}
                <>
                  <div className="action">
                    <HeartOutlined color="#fff" />
                  </div>
                  <div className={"details"}>
                    <div className="name">{activeItem.name}</div>
                    <div className="type">{activeItem.type}</div>
                    <div className="price">{activeItem.price}</div>
                  </div>

                  <div className={"image image-active"}>
                    <img src={activeItem.image} />
                  </div>
                </>
              </div>
              // </FadeIn>
            )}
          </div>
        </div>
      </div>
      {selected && (
        <div>
          Selected Item:
          <div>{selected.name}</div>
        </div>
      )}
      {/* <button onClick={() => rotateAr()}>Rotate</button> */}
      {/* <Overlay target={target.current} show={show} placement="right">
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
          <div
            {...props}
            style={{
              backgroundColor: "rgba(255, 100, 100, 0.85)",
              padding: "2px 10px",
              color: "white",
              borderRadius: 3,
              ...props.style,
            }}
          >
            Simple tooltip
          </div>
        )}
      </Overlay> */}
      {/* <style jsx global>
        {`
          .details {
            display: grid;
            grid-template-rows: auto;
            grid-gap: 0px;
            font-size: 12px;
            line-height: 14px;
            padding: 8px;
            text-align: right;
          }
          .hidden {
            opacity: 0;
            transition: opacity 100ms ease-in-out;
          }
          .active {
            opacity: 1;
            transition: opacity 100ms ease-in-out;
          }
        `}
      </style> */}
    </div>
  );
};

export default OverlayVideo;
