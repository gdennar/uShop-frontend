import React from "react";
import classes from "./ProductItem.module.css";
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
    <div className={`${grid ? classes.grid : classes.list}`}>
      <Link to={`/product-details/${id}`} className={classes.prodLink}>
        <div className={classes.img}>
          <img src={imageUrl} alt={name} />
        </div>
      </Link>
      <div className={classes.prdContent}>
        <div className={classes.details}>
          <p>{shortenText(name, 20)}</p>
          <p>
            <span>{`$${price.toFixed(2)}`} </span>
            <span className={classes.wishList}>
              <FaRegHeart />
            </span>
          </p>
        </div>
        {!grid && <p className={classes.desc}>{shortenText(desc, 200)}</p>}
        <Button
          className={classes.buttonPrd}
          onClick={() => addToCartHandler(product)}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
