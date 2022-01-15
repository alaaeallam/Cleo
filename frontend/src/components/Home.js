/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { getProducts } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import MetaData from './layout/MetaData';
import Loader from './layout/Loader';
import Product from './product/Product';
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const Home = () => {
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState('');
  const categories = [
    'Electronics',
    'Cameras',
    'Laptops',
    'Accessories',
    'Headphones',
    'Food',
    'Books',
    'Clothes/Shoes',
    'Beauty/Health',
    'Sports',
    'Outdoor',
    'Home',
  ];
  const alert = useAlert();
  const dispatch = useDispatch();
  const {
    loading,
    products,
    error,
    productsCount,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const keyword = params.keyword;
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage, price, category));
  }, [dispatch, alert, error, keyword, currentPage, price, category]);
  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }
  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={'Buy best products online'} />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {keyword ? (
                <Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{ 1: `LE 1`, 1000: `LE 1000` }}
                        min={1}
                        max={1000}
                        defaultValue={(1, 1000)}
                        tipFormator={(value) => `LE${value}`}
                        tipProops={{
                          placement: 'top',
                          visible: true,
                        }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />
                      <hr className="my-5" />
                      <div className="mt-5">
                        <h4 className="mb-3">Categories</h4>
                        <ul className="pl-0">
                          {categories.map((category) => (
                            <li
                              style={{
                                cursor: 'pointer',
                                listStyleType: 'none',
                              }}
                              key={category}
                              onClick={() => setCategory(category)}
                            >
                              {category}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products.map((product) => (
                        <Product key={product._id} product={product} col={4} />
                      ))}
                    </div>
                  </div>
                </Fragment>
              ) : (
                products.map((product) => (
                  <Product key={product._id} product={product} col={3} />
                ))
              )}
            </div>
          </section>
          {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={'Next'}
                prevPageText={'Prev'}
                firstPageText={'First'}
                lastPageText={'Last'}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
