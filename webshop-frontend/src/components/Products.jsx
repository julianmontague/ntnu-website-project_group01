import React, { useMemo, useState } from "react";
import { Box, Stack } from "@mui/system";
import Category from "./Category";
import ProductCard from "./ProductCard";
import { Button, Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchBar from "./SearchBar";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import IconMenu from "./IconMenu";

let productsOriginal = [
  {
    id: 1,
    productName: "Coffee",
    sale: false,
    type: "Coffee",
    price: 67,
    imagePath:
      "http://cdn.shopify.com/s/files/1/0548/9469/0401/products/WHOLE_2.png?v=1668467257",
  },
  {
    id: 2,
    productName: "Coffee",
    sale: true,
    type: "Coffee",
    price: 100,
    imagePath:
      "http://cdn.shopify.com/s/files/1/0548/9469/0401/products/WHOLE_2.png?v=1668467257",
  },
  {
    id: 3,
    productName: "Coffee",
    sale: false,
    type: "Coffee",
    price: 40,
    imagePath:
      "http://cdn.shopify.com/s/files/1/0548/9469/0401/products/WHOLE_2.png?v=1668467257",
  },
  {
    id: 4,
    productName: "Tea",
    sale: false,
    type: "Tea",
    price: 70,
    imagePath:
      "http://cdn.shopify.com/s/files/1/0548/9469/0401/products/WHOLE_2.png?v=1668467257",
  },
  {
    id: 5,
    productName: "Tea",
    sale: true,
    type: "Tea",
    price: 90,
    imagePath:
      "http://cdn.shopify.com/s/files/1/0548/9469/0401/products/WHOLE_2.png?v=1668467257",
  },
  {
    id: 6,
    productName: "Tea",
    sale: true,
    type: "Tea",
    price: 110,
    imagePath:
      "http://cdn.shopify.com/s/files/1/0548/9469/0401/products/WHOLE_2.png?v=1668467257",
  },
  {
    id: 7,
    productName: "Tea",
    sale: false,
    type: "Tea",
    price: 140,
    imagePath:
      "http://cdn.shopify.com/s/files/1/0548/9469/0401/products/WHOLE_2.png?v=1668467257",
  },
  {
    id: 8,
    productName: "Food",
    type: "Food",
    sale: true,
    price: 99,
    imagePath:
      "http://cdn.shopify.com/s/files/1/0548/9469/0401/products/WHOLE_2.png?v=1668467257",
  },
  {
    id: 9,
    productName: "Food",
    type: "Food",
    sale: false,
    price: 30,
    imagePath:
      "http://cdn.shopify.com/s/files/1/0548/9469/0401/products/WHOLE_2.png?v=1668467257",
  },
  {
    id: 10,
    productName: "Pastries",
    type: "Pastries",
    sale: false,
    price: 50,
    imagePath:
      "http://cdn.shopify.com/s/files/1/0548/9469/0401/products/WHOLE_2.png?v=1668467257",
  },
];

const Products = ({ selectedCategory, showAllProducts, onCategoryClick }) => {
  // Fetching product data from API
  const theme = useTheme();

  const buttonStyles = {
    borderRadius: "1.2rem",
    padding: "0.8rem 1.2rem",
    color: theme.palette.secondary.main,
  };

  const sortButtonMenu = [
    {
      name: "Ascending",
      icon: () => <TrendingUpIcon />,
    },
    {
      name: "Descending",
      icon: () => <TrendingDownIcon />,
    },
  ];

  let filteredProducts = selectedCategory
    ? productsOriginal.filter((product) => product.type === selectedCategory)
    : productsOriginal;

  if (selectedCategory === "Sale") {
    filteredProducts = productsOriginal.filter(
      (product) => product.sale === true
    );
  }

  const displayedProducts = showAllProducts
    ? productsOriginal
    : filteredProducts;

  const [sortDirection, setSortDirection] = useState(null);

  const sortedProducts = useMemo(() => {
    const sorted = [...displayedProducts];
    if (sortDirection === "asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortDirection === "desc") {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  }, [displayedProducts, sortDirection]);

  const handleSort = (direction) => {
    setSortDirection(direction);
  };

  const [sortAnchorEl, sortSetAnchorEl] = useState(null);

  return (
    <Grid container spacing={0}>
      {/* //TODO make a button or horizontal component on smaller screens} */}
      <Grid item md={2} p={4}>
        <Category onCategoryChange={onCategoryClick} />
      </Grid>
      <Grid item md={10} p={4}>
        <Box
          sx={{
            backgroundColor: "primary.main",
            color: theme.palette.primary.contrastText,
            padding: "10px",
            borderRadius: "8px",
            textAlign: "center",
            justifySelf: "center",
            margin: "0 auto",
            marginBottom: "0.8rem",
          }}
        >
          <Typography variant="body1">
            Awaken your senses with every sip - Experience the perfect cup of
            coffee with us!
          </Typography>
        </Box>

        <Stack
          direction={"row"}
          columnGap={"1rem"}
          sx={{
            marginBottom: 4,
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            aria-haspopup="true"
            aria-controls="menu"
            sx={buttonStyles}
            onClick={(event) => {
              sortSetAnchorEl(event.currentTarget);
            }}
          >
            <FilterListIcon sx={{ paddingRight: "0.5rem" }} />
            <Typography variant="button">Sort</Typography>
          </Button>
          <IconMenu
            menuItems={sortButtonMenu}
            anchorEl={sortAnchorEl}
            setAnchorEl={sortSetAnchorEl}
            handleSort={handleSort}
          />

          <SearchBar />
        </Stack>

        <Grid container spacing={5}>
          {sortedProducts.map(({ id, productName, price, imagePath }) => (
            <Grid item key={id} md={3}>
              <ProductCard
                productName={productName}
                price={price}
                imagePath={imagePath}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Products;
