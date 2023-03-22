import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";
import "./ViewProducts.css";
import { db, storage } from "../../firebase/config";
import Loader from "../Loader";
import Tables from "../Table";
import Notiflix from "notiflix";
import { deleteObject, ref } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../../store/productSlice";
import useFetchCollection from "../../customHooks/useFetchCollection";
import Search from "../Search";
import { filterAction } from "../../store/filterSlice";
import "./ViewProducts.css";
import Pagination from "../Pagination";

const ViewProducts = () => {
	const [search, setSearch] = useState("");
	const { data, isLoading } = useFetchCollection("products");
	const products = useSelector((state) => state.product.products);
	const filteredProduct = useSelector((state) => state.filter.filteredProduct);

	// Pagination state
	const [currentPage, setcurrentPage] = useState(1);
	const [productPerPage] = useState(9);

	// Get Current Products
	const indexOfLastProduct = currentPage * productPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productPerPage;
	const currentProducts = filteredProduct.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(
			productAction.storeProducts({
				products: data,
			})
		);
	}, [dispatch, data]);

	useEffect(() => {
		dispatch(filterAction.filterBySearch({ products, search }));
	}, [dispatch, products, search]);

	const confirmDelete = (id, imageUrl) => {
		Notiflix.Confirm.show(
			"Delete Product?",
			"You are about to delete this product?",
			"Delete",
			"Cancel",
			function okCb() {
				deleteProduct(id, imageUrl);
			},
			function cancelCb() {
				alert("ok! If you say so...");
			},
			{
				width: "320px",
				borderRadius: "5px",
				okButtonBackground: "#ffb700",
				titleColor: "#ffb700",
				titleFontSize: "1.2rem",
				cssAnimationStyle: "zoom",
			}
		);
	};

	const deleteProduct = async (id, imageUrl) => {
		try {
			await deleteDoc(doc(db, "products", id));

			const storageRef = ref(storage, imageUrl);

			await deleteObject(storageRef);
			toast.success("Product Deleted");
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<>
			<div className="view-products">
				{isLoading && <Loader />}
				<ToastContainer />
				<h3>All Products</h3>
				<div>
					<p>
						<b>{filteredProduct.length}</b> products found
					</p>
					<Search
						className="admin-search"
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
						}}
					/>
				</div>
				{filteredProduct.length === 0 ? (
					<>
						<p>No product found!</p>
					</>
				) : (
					<>
						<Tables
							data={currentProducts}
							onDelete={(id, imageUrl) => confirmDelete(id, imageUrl)}
						/>
					</>
				)}
				<Pagination
					currentPage={currentPage}
					setCurrentPage={setcurrentPage}
					productPerPage={productPerPage}
					totalProducts={filteredProduct.length}
				/>
			</div>
		</>
	);
};

export default ViewProducts;
