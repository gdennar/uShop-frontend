import React from "react";
import "./ProductItem.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartAction } from "../../store/CartSlice";
import { FaRegHeart } from "react-icons/fa";

const ProductItem = ({ grid, product, id, name, price, imageUrl, desc }) => {
  const dispatch = useDispatch();

  const shortenText = (text, num) => {
    if (text.length > num) {
      const shortText = text.substring(0, num).concat("...");
      return shortText;
    }
    return text;
  };

  const addToCartHandler = (product) => {
    dispatch(cartAction.addToCart(product));
    dispatch(cartAction.calculateCartQuantity());
  };

  return (
    <div className={grid ? "grid" : "list"}>
      <Link to={`/product-details/${id}`} className="prod-link">
        <div className="img">
          <img src={imageUrl} alt={name} />
        </div>
      </Link>
      <div className="prd-content">
        <div className="details">
          <p>{shortenText(name, 20)}</p>
          <p>
            <span>{`$${price.toFixed(2)}`} </span>
            <span className="wishList">
              <FaRegHeart />
            </span>
          </p>
        </div>
        {!grid && <p className="desc">{shortenText(desc, 200)}</p>}
        <Button
          className="button-prd"
          onClick={() => addToCartHandler(product)}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
