import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  Grid,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import heroImg from "../../assets/images/image4.png";

export default function AuthPageLayout({ children, tagline }) {
  return (
    <Box minH="100vh" bg="gray.50">
      <Box as="nav" bg="white" position="sticky" top={0} zIndex={10} shadow="sm">
        <Container maxW="7xl">
          <Flex justify="space-between" align="center" py={4}>
            <Heading size="md" as={RouterLink} to="/" _hover={{ opacity: 0.85 }}>
              <Text as="span" fontFamily="heading">
                JMD{" "}
              </Text>
              <Text as="span" color="orange.500" fontFamily="heading">
                Constructions
              </Text>
            </Heading>
            <Flex gap={2} align="center">
              <Button
                as={RouterLink}
                to="/login"
                // variant="ghost"
                colorScheme="orange"
                rounded="sm"
                fontWeight="medium"
              >
                Log In
              </Button>
              
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} minH={{ lg: "calc(100vh - 73px)" }}>
        <Box
          position="relative"
          display={{ base: "none", lg: "block" }}
          minH={{ lg: "calc(100vh - 73px)" }}
        >
          <Box
            position="absolute"
            inset={0}
            bgImage={`url(${heroImg})`}
            bgSize="cover"
            bgPosition="center"
          />
          <Box position="absolute" inset={0} bg="blackAlpha.700" />
          <Flex
            position="relative"
            direction="column"
            justify="flex-end"
            h="100%"
            p={12}
            color="white"
          >
            <Heading size="3xl" letterSpacing="tight">
              JMD
            </Heading>
            <Heading size="3xl" letterSpacing="tight" mb={4}>
              CONSTRUCTIONS
            </Heading>
            <Text maxW="md" color="whiteAlpha.900" fontSize="lg" lineHeight="tall">
              {tagline ||
                "Buniyaad is an in-house platform helping JMD Constructions streamline projects and deliver excellence."}
            </Text>
          </Flex>
        </Box>

        <Flex align="center" justify="center" py={{ base: 10, md: 14 }} px={{ base: 4, md: 8 }}>
          <Box w="full" maxW="md">
            {children}
          </Box>
        </Flex>
      </Grid>
    </Box>
  );
}
