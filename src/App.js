import logo from "./logo.svg";
import "./App.css";
import { Carousel, Button } from "antd";

function App() {
  const onChange = (a, b, c) => {
    console.log(a, b, c);
  };

  const contentStyle = {
    height: "260px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    adaptiveHeight: true,
    height: "500px",
  };
  const product = (name, price, link) => {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto",
          alignContent: "center",
          justifyContent: "center",
          backgroundColor: "#dbdbdb",
          border: "1px solid grey",
          width: "260px",
          height: "260px",
          margin: "auto",
          gridGap: "16px",
        }}
      >
        <div>{name}</div>
        <div>{price}</div>
        <Button
          onClick={() => {
            window.open(link, "_blank");
          }}
        >
          Add to Cart
        </Button>
      </div>
    );
  };
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ maxWidth: "80vw" }}>
          <Carousel afterChange={onChange} {...settings}>
            <div>
              {product(
                "Maybelline Eye Liner",
                "$5.00",
                "http://localhost:3001/p1"
              )}
            </div>
            <div>
              {product(
                "Estee Lauder Mascara",
                "$6.00",
                "http://localhost:3001/p2"
              )}
            </div>
            <div>
              {product(
                "Maybelline Lipstick",
                "$5.99",
                "http://localhost:3001/p3"
              )}
            </div>
            <div>
              {product(
                "Maybelline Sun Screen Lotion",
                "$10.00",
                "http://localhost:3001/p4"
              )}
            </div>
            <div>
              {product(
                "Estee Lauder Moisturizer",
                "$9.00",
                "http://localhost:3001/p5"
              )}
            </div>
            <div>
              {product(
                "Estee Lauder Eye Shadow",
                "$8.00",
                "http://localhost:3001/p6"
              )}
            </div>
          </Carousel>
        </div>
      </header>
    </div>
  );
}

export default App;