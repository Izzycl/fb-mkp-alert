import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Input,
  Square,
  Text,
} from "@chakra-ui/react";
import { searchService } from "./services/search";
import ProductCardItem from "./components/ProductCardItem";
import { IBaseItem, IExtraData } from "./models/Common";
import { SmallCloseIcon } from "@chakra-ui/icons";

function App() {
  const [items, setItems] = useState<IBaseItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [locationsBags, setLocationsBags] = useState<string[]>([]);
  const [extraData, setExtraData] = useState<IExtraData>();
  const [loading, setLoading] = useState<boolean>(false);
  async function getData() {
    setLoading(true);
    try {
      const r = await (
        await searchService.querySearch(searchQuery!, locationsBags!)
      ).data;
      console.log(r);
      setExtraData({
        quantity: r.quantity,
        query: r.query,
        locations: r.locations,
      });
      setItems(r.items);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const onKeyPress = (e: any) => {
    if (e.key === "Enter") {
      if (location != "") {
        setLocationsBags((val) => {
          return [...val, location];
        });
        setLocation("");
        getData();
      }
    }
  };

  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      flexDir="column"
      justifyContent="center"
      width="100%"
      minH="100vh"
      backgroundColor={"blue.900"}
      color={"white"}
    >
      <Flex flexDirection="row" wrap="wrap" width="70%" alignSelf="center">
        <Text>Item to search</Text>
        <Input
          marginBottom="10"
          placeholder="Search"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <Text>
          Locations (press "Enter" to add a list of locations to search)
        </Text>
        <Input
          placeholder="Locations"
          onKeyPress={(e) => onKeyPress(e)}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Flex width="100%" flexWrap="wrap" marginY={"2"}>
          {locationsBags.map((e: string, idx: number) => {
            return (
              <Badge
                colorScheme="blue"
                marginRight={"1"}
                marginBottom={"1"}
                key={idx}
                padding={"1"}
                textAlign={"center"}
                verticalAlign={"center"}
              >
                {e}{" "}
                <SmallCloseIcon
                  color={"white"}
                  w={4}
                  h={4}
                  borderRadius={"10"}
                  backgroundColor={"red.800"}
                  onClick={() => {
                    setLocationsBags(
                      locationsBags.filter((_e, id: number) => id != idx)
                    );
                    getData();
                  }}
                />
              </Badge>
            );
          })}
        </Flex>

        <Button
          onClick={() => getData()}
          width="100%"
          colorScheme="blue"
          size={"lg"}
          isLoading={loading}
        >
          Search
        </Button>
        {!loading ? (
          items.length > 1 ? (
            <Flex
              w="100%"
              flexWrap={"wrap"}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Text w="100%" color={"white"} marginY="4" fontSize={"lg"}>
                Result: {extraData!.quantity} items found for{" "}
                <b>"{extraData!.query}"</b>
              </Text>
              {items.map((e: IBaseItem) => {
                return <ProductCardItem {...e} />;
              })}
            </Flex>
          ) : (
            <Text width="100%" textAlign={"center"} color="white" fontSize="md">
              Items not found
            </Text>
          )
        ) : null}
      </Flex>
    </Flex>
  );
}

export default App;
