import { List } from "../components/MostPopular/List";
import { Category } from "../components/MostPopular/Category";
import { BestSellingProducts } from "../components/MostPopular/BestSellingProducts";
import { FlashSales } from "../components/MostPopular/FlashSales";

const Home = () => {
  return (
    <div className="mb-5">
      <List />
      <FlashSales />
      <div
        style={{
          borderBottom: "1px solid rgb(223, 223, 223)",
          width: "90%",
          margin: "80px 85px",
        }}
      ></div>
      <Category />
      <div
        style={{
          borderBottom: "1px solid rgb(223, 223, 223)",
          width: "90%",
          margin: "80px 85px",
        }}
      ></div>
      <BestSellingProducts />
    </div>
  );
};

export default Home;
