import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Card,
  Image,
  Text,
  Link,
  SearchField,
  Icon,
} from "gestalt";
import Strapi from "strapi-sdk-javascript/build/main";
import Loader from "./Loader";

const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

function App() {
  const [state, setState] = useState({
    brands: [],
    searchTerm: "",
    error: "",
    loadingBrands: true,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await strapi.request("POST", "/graphql", {
          data: {
            query: `query{
            brands {
              _id
              name
              description
              image { 
                url
              }
            }
          }`,
          },
        });
        setState((state) => {
          return {
            ...state,
            brands: response.data.brands,
            loadingBrands: false,
          };
        });
      } catch (err) {
        setState((state) => {
          return { ...state, error: err.message, loadingBrands: false };
        });
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const handleSearch = ({ value }) => {
    setState((state) => {
      return {
        ...state,
        searchTerm: value,
      };
    });
  };

  const filterBrands = ({ searchTerm, brands }) => {
    return brands.filter((brand) => {
      return (
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  const { searchTerm, loadingBrands } = state;
  return (
    <Container>
      <Box display="flex" justifyContent="center" marginBottom={2}>
        <h2>Splash Page</h2>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <SearchField
          id="searchField"
          accessibilityLabel="Brands Search Field"
          onChange={handleSearch}
          placeholder="Search Brands"
          value={searchTerm}
        />
        <Box marginLeft={4}>
          <Icon
            icon="filter"
            color={searchTerm ? "orange" : "gray"}
            size={20}
            accessibilityLabel="Filter"
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="around" wrap>
        {filterBrands(state).map((brand) => (
          <Box key={brand._id} width={200} margin={2} paddingY={4}>
            <Link href={`/${brand._id}`}>
              <Card
                image={
                  <Box height={200} width={200}>
                    <Image
                      alt="Brand"
                      naturalHeight={1}
                      naturalWidth={1}
                      src={`${apiUrl}/${brand.image.url}`}
                    />
                  </Box>
                }
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  direction="column"
                >
                  <Text size="lg" weight="bold">
                    {brand.name}
                  </Text>
                  <Text>{brand.description}</Text>
                  <Text size="sm" weight="bold">
                    See More
                  </Text>
                </Box>
              </Card>
            </Link>
          </Box>
        ))}
      </Box>
      <Loader show={loadingBrands} />
    </Container>
  );
}

export default App;
