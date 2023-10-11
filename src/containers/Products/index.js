import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import ProductsLogo from '../../assets/products-logo.svg';
import { CardProduct } from '../../components';
import api from '../../services/api';
import formartCurrency from '../../utils/formatCurrency';
import {
  Container,
  ProductsImg,
  CategoryButton,
  CategoriesMenu,
  ProductsContainer
} from './styles';

export function Products() {
  const { state } = useLocation();
  // console.log(state);
  let categoryId = 0;
  // ELVIS OPERATOR
  if (state?.categoryId) {
    categoryId = state.categoryId;
  }

  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(categoryId);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('categories');

      const newCategories = [{ id: 0, name: 'Todas' }, ...data];

      setCategories(newCategories);
    }

    loadCategories();

    async function loadProducts() {
      const { data: allProducts } = await api.get('products');

      const newProducts = allProducts.map(product => {
        return { ...product, fromatedPrice: formartCurrency(product.price) };
      });

      setProducts(newProducts);
    }

    loadProducts();
  }, []);

  useEffect(() => {
    if (activeCategory === 0) {
      setFilteredProducts(products);
    } else {
      const newFilteredProducts = products.filter(
        product => product.category_id === activeCategory
      );

      setFilteredProducts(newFilteredProducts);
    }
  }, [activeCategory, products]);

  return (
    <Container>
      <ProductsImg src={ProductsLogo} alt="products-logo" />
      <CategoriesMenu>
        {categories &&
          categories.map(category => (
            <CategoryButton
              type="button"
              key={category.id}
              isActiveCategory={activeCategory === category.id}
              onClick={() => {
                setActiveCategory(category.id);
              }}
            >
              {category.name}
            </CategoryButton>
          ))}
      </CategoriesMenu>
      <ProductsContainer>
        {filteredProducts &&
          filteredProducts.map(product => (
            <CardProduct key={product.id} product={product} />
          ))}
      </ProductsContainer>
    </Container>
  );
}
