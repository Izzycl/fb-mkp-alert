import { Box, Image, Badge, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IBaseItem } from "../models/Common";

interface ProductCardItemProp extends IBaseItem {}

function ProductCardItem(props: ProductCardItemProp) {
  const { ide, title, image, price, link } = props;
  return (
    <Box
      overflow="hidden"
      borderRadius={"5"}
      shadow={"dark-lg"}
      width="32%"
      marginY="10"
      cursor={"pointer"}
      backgroundColor={"blackAlpha.100"}
      onClick={() => {
        window.open(link, "_blank");
      }}
      color={"white"}
    >
      <Flex justifyContent="center" width="100%">
        <Image src={image} objectFit={"cover"} width={"100%"} />
      </Flex>

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {price}
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          ></Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        ></Box>

        <Box display="flex" mt="2" alignItems="center">
          <Box as="span" color="white" fontSize="md">
            {title}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductCardItem;
