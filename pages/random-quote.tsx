import { useEffect, useState } from "react";
import { Box, Button, Flex, Text, Tag } from "@chakra-ui/react";
import Link from "next/link";

import { QUOTES_API_URL } from "../src/constants";
import { Quote } from "../src/types";

export default function RandomQuotePage() {
  const [randomQuote, setRandomQuote] = useState<Quote>();

  const getRandomQuote = async () => {
    const request = await fetch(`${QUOTES_API_URL}/random`);

    const quote = await request.json();

    setRandomQuote(quote);
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <Box
      width={"100vw"}
      height={"100vh"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Flex flexDirection={"column"} gap={4}>
        <Flex
          rounded={"lg"}
          bg={"blackAlpha.200"}
          flexDirection={"column"}
          p={4}
          gap={4}
        >
          <Text fontSize={"2xl"}>Quote - {randomQuote?._id}</Text>
          <Text fontSize={"lg"}>{randomQuote?.content}</Text>
          <Text fontStyle={"italic"}> - {randomQuote?.author}</Text>

          <Flex gap={2}>
            {randomQuote?.tags &&
              randomQuote.tags.map((tag) => <Tag w="max-content">{tag}</Tag>)}
          </Flex>
        </Flex>
        <Flex flexDirection={"row"} width={"100%"} gap={4}>
          <Button
            colorScheme={"blue"}
            onClick={() => {
              getRandomQuote();
            }}
          >
            Refetch random quote
          </Button>
          <Link href={"/"}>
            <Button colorScheme={"blue"}>Get all quotes!</Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
