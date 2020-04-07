import React, { useEffect, useState } from "react";
import Strapi from "strapi-sdk-javascript/build/main";
import { Link } from "react-router-dom";
import {
  Container,
  Box,
  Card,
  Image,
  Text,
  Button,
  Mask,
  Heading,
  IconButton,
} from "gestalt";

import { calculatePrice, setCart, getCart } from "../utils";
import Loader from "./Loader";

const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

function Programs(props) {
  const [state, setState] = useState({
    brand: "",
    programs: [],
    cartItems: [],
    error: "",
    loadingData: true,
  });

  const { brandId } = props.match.params;
  const { loadingData, brand, programs, cartItems } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await strapi.request("POST", "/graphql", {
          data: {
            query: `query brandPrograms {
              brand(id:"${brandId}"){
                name
                description
                programs {
                  _id
                  name
                  description
                  price
                  image {
                    url
                  }
                }
              }
            }`,
          },
        });
        setState((state) => {
          return {
            ...state,
            brand: response.data.brand.name,
            programs: response.data.brand.programs,
            cartItems: getCart(),
            loadingData: false,
          };
        });
      } catch (err) {
        setState((state) => {
          return { ...state, error: err.message, loadingData: false };
        });
        console.error(err);
      }
    };
    fetchData();
  }, [brandId]);

  const addToCart = (program) => {
    const alreadyInCart = cartItems.findIndex(
      (item) => item._id === program._id
    );

    let updatedItems;
    if (alreadyInCart === -1) {
      updatedItems = cartItems.concat({
        ...program,
        quantity: 1,
      });
    } else {
      updatedItems = [...cartItems];
      updatedItems[alreadyInCart].quantity += 1;
    }

    setState((state) => {
      return {
        ...state,
        cartItems: updatedItems,
      };
    });

    setCart(updatedItems);
  };

  const deleteItemFromCart = (id) => {
    const filteredItems = cartItems.filter((item) => item._id !== id);
    setState((state) => {
      return {
        ...state,
        cartItems: filteredItems,
      };
    });
    setCart(filteredItems);
  };

  return (
    <Container>
      <Box display="flex" justifyContent="center" marginBottom={2}>
        <h2>{brand}</h2>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginBottom={2}
        dangerouslySetInlineStyle={{
          __style: {
            flexWrap: "wrap-reverse",
          },
        }}
      >
        <Box display="flex" justifyContent="center" alignItems="center" wrap>
          {programs.map((program) => (
            <Card
              key={program._id}
              image={
                <Box width={200} height={125}>
                  {program.image[0] && (
                    <Image
                      alt="Program"
                      naturalHeight={1}
                      naturalWidth={1}
                      src={`${apiUrl}/${program.image[0].url}`}
                    />
                  )}
                </Box>
              }
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                direction="column"
                width={200}
              >
                <h4>{program.name}</h4>
                <p>{program.description}</p>
                <Text color="gray">${program.price}</Text>
                <br />
                <Button text="Add to Cart" onClick={() => addToCart(program)} />
              </Box>
            </Card>
          ))}
        </Box>
        <Box marginTop={2} marginLeft={8}>
          <Mask shape="rounded" wash>
            <Box display="flex" direction="column" padding={2}>
              <Heading align="center" size="sm">
                Your Cart
              </Heading>
              <Text color="gray" italic>
                {cartItems.length} items selected
              </Text>

              {cartItems.map((item) => (
                <Box display="flex" alignItems="center" key={item._id}>
                  <Text>
                    {item.name} x {item.quantity} -{" "}
                    {(item.quantity * item.price).toFixed(2)}
                  </Text>
                  <IconButton
                    accessibilityLabel="Delete Item"
                    icon="cancel"
                    size="sm"
                    iconColor="red"
                    onClick={() => deleteItemFromCart(item._id)}
                  ></IconButton>
                </Box>
              ))}

              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                direction="column"
              >
                <Box margin={2}>
                  {cartItems.length === 0 && (
                    <Text color="red">Please select some programs</Text>
                  )}
                </Box>
                <Text size="lg">Total: {calculatePrice(cartItems)}</Text>
                <Text>
                  <Link to="/checkout">Checkout</Link>
                </Text>
              </Box>
            </Box>
          </Mask>
        </Box>
      </Box>
      <Loader show={loadingData} />
    </Container>
  );
}

export default Programs;
