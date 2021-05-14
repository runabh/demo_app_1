import porfilepic from "./profile.png";
import video from "./1-Favorite-Things-Emily-V16.mov";
import Overlay from "react-overlays/Overlay";
import { useState, useRef, useEffect } from "react";
import "./style.css";
import { HeartOutlined } from "@ant-design/icons";
import { Transition } from "react-transition-group";
const duration = 2500;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: {
    display: "grid",
    gridTemplateColumns: "50px auto 80px",
    backgroundColor: "#00000050",
    borderRadius: "40px",
    alignItems: "center",
    opacity: 0.7,
    margin: "16px auto",
    transition: `opacity 2500ms ease-in-out`,
  },
  entered: {
    display: "grid",
    gridTemplateColumns: "50px auto 80px",
    backgroundColor: "#00000050",
    borderRadius: "40px",
    alignItems: "center",
    opacity: 1,
    margin: "16px auto",
    transition: `opacity 2500ms ease-in-out`,
  },
  exiting: {
    display: "grid",
    gridTemplateColumns: "80px",
    alignItems: "center",
    height: "40px",
    opacity: 0.7,
    transition: `opacity 2500ms ease-in-out`,
  },
  exited: {
    display: "grid",
    gridTemplateColumns: "80px",
    alignItems: "center",
    height: "40px",
    opacity: 0.5,
    transition: `opacity 2500ms ease-in-out`,
  },
};

const OverlayVideo = (props) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const [currentPlayerTime, setCurrentPlayerTime] = useState(0);

  const [selected, setSelected] = useState(null);

  const [list, setList] = useState([
    {
      name: "Organic Hair Rinse",
      price: "$25.05",
      type: "Sky Blue Coeus",
      image:
        "https://cdn.shopify.com/s/files/1/0519/2391/0810/products/IMG_1322-scaled.jpg?v=1620016340",
      start: 69,
    },
    {
      name: "Complete Pore Vanishing Primer",
      price: "$17.71",
      type: "Black Eucalyptus",
      image:
        "https://cdn.shopify.com/s/files/1/0519/2391/0810/products/CFP03.jpg?v=1619698649",
      start: 55,
    },
    {
      name: "Apricot Tank Top",
      price: "$26.15",
      type: "Teal Demeter",
      image:
        "https://cdn.shopify.com/s/files/1/0519/2391/0810/products/Apricot_Spaghetti_Strap_Buttoned_Tank_Top_3.jpg?v=1620016683",
      start: 43,
    },
    {
      name: "Crepe Cold Shoulder Maxi Dress",
      price: "$106.34",
      type: "Glow Road",
      image:
        "https://cdn.shopify.com/s/files/1/0519/2391/0810/products/1579509614023_WhatsApp_Image_2020-01-20_at_13.28.27-originnm80prcnt.jpg?v=1620015851",
      start: 29,
    },
    {
      name: "100% Pure Virgin Neem Oil ",
      price: "$221.43",
      type: "Yellow Poppy",
      image:
        "https://cdn.shopify.com/s/files/1/0519/2391/0810/products/il_570xN.1058575265_9bxk.jpg?v=1619698651",
      start: 15,
    },
    {
      name: "CREAM TO POWDER BLUSH",
      price: "$19.14",
      type: "White Pontus",
      image:
        "https://cdn.shopify.com/s/files/1/0519/2391/0810/products/22312_CREAM_TO_POWDER_NATURAL_ROSE.jpg?v=1619698648",
      start: 3,
    },
  ]);
  const firstHostpot = 3;

  const rotateAr = () => {
    const newAr = [...list];
    let last = newAr.pop();
    newAr.unshift(last);
    setList(newAr);
  };

  const checkIfShouldRotate = (currentTime) => {
    const currentItem = list[list.length - 1];
    const nextItem = list[list.length - 2];
    console.log("Current time: ", Math.floor(currentTime));
    if (
      currentTime > currentItem.start &&
      Math.floor(currentTime) === nextItem.start
    ) {
      rotateAr();
    }
  };

  const Card = ({ item, index, length }) => {
    const isActive =
      index === length - 1 &&
      currentPlayerTime >= firstHostpot &&
      currentPlayerTime < item.start + 10 &&
      currentPlayerTime >= item.start;
    return (
      <Transition in={isActive} timeout={duration}>
        {(state) => (
          <div
            // className={isActive ? "card card-active" : "card"}
            onClick={() => {
              setSelected(item);
            }}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            {isActive && (
              <>
                <div className="action">
                  <HeartOutlined color="#fff" />
                </div>
                <div className="details">
                  <div className="name">{item.name}</div>
                  <div className="type">{item.type}</div>
                  <div className="price">{item.price}</div>
                </div>
              </>
            )}
            <div className={isActive ? "image image-active" : "image"}>
              <img src={item.image} />
            </div>
          </div>
        )}
      </Transition>
    );
  };

  const creatorDetails = {
    name: "EMILY DIDONATO",
    videoTitle: `Emily DiDonato's 10 Favorite Things On-Set with SI SWIM`,
    totalProducts: 10,
    views: "43.4K",
    likes: "25.6K",
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
          <source src={video} type="video/mp4" />
        </video>
        <div className="interaction">
          <div className="video-details">
            <div>
              <img src={porfilepic} />
            </div>
            <div className="creator-details">
              <div>{creatorDetails.name}</div>
              <div>{creatorDetails.videoTitle}</div>
              <div>
                <span>{creatorDetails.totalProducts} PRODUCTS</span>
                <span>{creatorDetails.views} VIEWS</span>
                <span>{creatorDetails.likes} LIKES</span>
              </div>
            </div>
          </div>
          <div className="card-container">
            {list.map((item, index) => {
              return (
                <Card
                  key={item.name}
                  item={item}
                  index={index}
                  length={list.length}
                />
              );
            })}
          </div>
          {/* <h2>Click this interactive layer</h2> */}
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
    </div>
  );
};

export default OverlayVideo;
