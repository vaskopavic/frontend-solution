import { useEffect, useState } from "react";
import { Button, Flex } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import Link from "next/link";

import { GENDER_API_URL, QUOTES_API_URL } from "../src/constants";
import { Quote, Gender } from "../src/types";

export default function HomePage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  async function getGender(author: string) {
    const request = await fetch(
      `${GENDER_API_URL}?name=${author.split(" ")[0]}`
    );

    const data: { gender: Gender } = await request.json();

    return data.gender === "male" ? "👨" : "👩";
  }

  useEffect(() => {
    const getQuotes = async () => {
      const request = await fetch(`${QUOTES_API_URL}/quotes?maxLength=150`);

      const data: { results: Quote[] } = await request.json();

      const quotesWithGender = await Promise.all(
        data.results.map(async (quote) => {
          const gender = await getGender(quote.author);

          return {
            ...quote,
            gender,
          };
        })
      );

      setQuotes(quotesWithGender);
    };

    getQuotes();
  }, []);

  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      flexDirection={"column"}
      gap={4}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <TableContainer w={"90%"} maxHeight={"70vh"} overflowY={"scroll"}>
        <Table variant="striped" colorScheme={"facebook"}>
          <TableCaption>Quotes</TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Quote</Th>
              <Th>Author</Th>
              <Th>Gender</Th>
            </Tr>
          </Thead>
          <Tbody>
            {quotes.map((quote) => {
              return (
                <Tr key={quote._id}>
                  <Td>{quote._id}</Td>
                  <Td>{quote.content}</Td>
                  <Td>{quote.author}</Td>
                  <Td>{quote.gender}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Link href={"/random-quote"}>
        <Button colorScheme={"blue"}>Get a random quote!</Button>
      </Link>
    </Flex>
  );
}
