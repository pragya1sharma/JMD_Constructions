//navbar
//heroSection ->HeroImg + CTA buttons. //Can also use marquee here. Test and TRY.
//About JMD Constructions
//Basic numbers -> Projects completed, running, safety rate.
//Our Projects section ->carousel from Chakra.
//Contact Us section

//About Buniyaad Construction Management App. //Marquee at the Bottom for the services offered by Buniyaad.
//Creating a react page ..FE ..FE..FE..FE
//Do all the imports, write the function **The return startement is the prime concern, export the function.

import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Grid,
  Flex,
  Image,
  VStack,
  List, 
  ListItem, 
  ListIcon,
  IconButton,
  Input,
  Textarea,
} from "@chakra-ui/react";

import Marquee from "react-fast-marquee";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import heroImg from "../assets/images/image4.png";
import car1 from "../assets/images/image1.png";
import car2 from "../assets/images/image2.png";
import car3 from "../assets/images/image3.png";
import car4 from "../assets/images/image5.png";

import { 
        CheckCircleIcon,
        StarIcon,
        WarningIcon,
        RepeatIcon,
        ArrowBackIcon, 
        ArrowForwardIcon
      } from "@chakra-ui/icons";





export default function LandingPage() {
  return (
    <>
      {/* navbar */}
      <Box as="nav" bg="white" position="sticky">
        <Container maxW="7xl">
          <Flex justify="space-between" align="center" padding={4} flexWrap="wrap" gap={4}>
            <Heading size="md" as={RouterLink} to="/">
              <Text as="span" fontFamily="heading">
                JMD{" "}
              </Text>
              <Text as="span" color="orange.500" fontFamily="heading">
                Constructions
              </Text>
            </Heading>
            <Flex gap={4} display={{ base: "none", md: "flex" }}>
              <Button variant="ghost" rounded="sm">Home</Button>
              <Button variant="ghost" rounded="sm">About Us</Button>
              <Button variant="ghost" rounded="sm">Projects</Button>
              <Button variant="ghost" rounded="sm">Contact Us</Button>
            </Flex>
            <Flex gap={2}>
              <Button as={RouterLink} to="/login" colorScheme="orange" rounded="sm" fontWeight="medium">
                Log In
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* ================= HERO SECTION ================= */}

      <Box
        h="90vh"
        bgImage={`url(${heroImg})`}
        bgSize="cover"
        bgPosition="center"
        position="relative"
      >
        {/* overlay for readability */}
        <Box
          position="absolute"
          inset={0}
          bg="blackAlpha.700"
        />

        <Container maxW="7xl" position="relative" h="100%">
          <Flex
            h="100%"
            direction="column"
            justify="flex-end"
            pb={20}
            color="white"
          >
            <Heading size="4xl">JMD</Heading>
            <Heading size = "4xl">CONSTRUCTIONS</Heading>

            <Text maxW="600px" mt={4}>
              Buniyaad is an in-house platform helping JMD Constructions
              streamline projects and deliver excellence.
            </Text>

            <Flex gap={4} mt={6} flexWrap="wrap">
              <Button as={RouterLink} to="/login" colorScheme="orange" rounded="sm" fontWeight="medium">
                Log In
              </Button>
            </Flex>
        </Flex>
        </Container>


        {/* the separation section and a little about Buniyaad */}
        <Box w="100%" bg="white">
          <Container maxW="7xl" py={20}>
            <Flex
              direction={{ base: "column", md: "row" }}
              gap={12}
              align="flex-start"
            >

              {/* Text section */}
              <Box flex="2">
                <Text
                  fontSize="lg"
                  fontWeight="sm"
                  lineHeight="tall"
                  color="gray.600"
                >
                  Buniyaad is an inhouse application that empowers JMD constructions
                  with innovative solutions to streamline projects, enhance efficiency,
                  and deliver excellence. From groundbreaking designs to seamless
                  execution, we elevate your construction experience.
                </Text>
              </Box>
              <Box flex="1">

              </Box>

              {/* List section */}
              <Box flex="1">
                <List spacing={5} color="gray.600" fontSize="md">

                  <ListItem display="flex" alignItems="flex-start">
                    <ListIcon as={CheckCircleIcon} color="black" mt={1} />
                    Delivering quality constructions since day one.
                  </ListItem>

                  <ListItem display="flex" alignItems="flex-start">
                    <ListIcon as={CheckCircleIcon} color="black" mt={1} />
                    Proven track record of excellence across diverse industries.
                  </ListItem>

                  <ListItem display="flex" alignItems="flex-start">
                    <ListIcon as={CheckCircleIcon} color="black" mt={1} />
                    Innovating to push boundaries in modern construction.
                  </ListItem>

                </List>
              </Box>

            </Flex>
          </Container>
        </Box>

        {/* ================= DARK FEATURE SECTION ================= */}
            <Box bg="black" color="white" py={20} size="cover" position="relative" w="100%">
                <Flex
                direction={{ base: "column", md: "row" }}
                gap={12}
                align="center"
                >
                {/* Left Image */}
                <Box flex="1">
                    <Image
                    src={heroImg} // <-- apni image yahan use karo
                    alt="Building"
                    objectFit="cover"
                    w="100%"
                    h={{ base: "400px", md: "600px" }}
                    filter="grayscale(100%) brightness(0.7)"
                    />
                </Box>

                {/* Right Content */}
                <Box flex="1">
                    <Heading size="lg" lineHeight="1.6" mb={6}>
                    With Years Of Experience In The Industry, Our Team Of Skilled
                    Professionals Works Tirelessly To Ensure That Every Project We
                    Undertake Is Completed On Time, Within Budget, And To The Highest
                    Standards.
                    </Heading>

                    <Button colorScheme="orange" mb={10}>
                    Contact Us →
                    </Button>

                    {/* Services */}
                    <Flex gap={10} align="flex-start">
                    <Text fontWeight="medium" minW="140px">
                        What We Do?
                    </Text>

                    <VStack align="start" spacing={4} flex="1">
                        {[
                        "Residential Construction",
                        "Commercial Construction",
                        "Renovation & Remodeling",
                        "Design & Build Service",
                        "Sustainability Construction",
                        ].map((service, i) => (
                        <Box
                            key={i}
                            w="100%"
                            borderBottom="1px solid"
                            borderColor="gray.700"
                            pb={2}
                            color="gray.400"
                            _hover={{ color: "white" }}
                            cursor="pointer"
                        >
                            {service}
                        </Box>
                        ))}
                    </VStack>
                    </Flex>
                </Box>
                </Flex>
            </Box>
      {/* ================= TRUST SECTION ================= */}
            <Box bg="gray.100" w="100%">
              <Container maxW="7xl" py={20}>
                <Flex
                  direction={{ base: "column", lg: "row" }}
                  gap={12}
                  align="center"
                >

                  {/* LEFT SIDE */}
                  <Box flex="1">

                    {/* Heading */}
                    <Heading
                      fontSize={{ base: "3xl", md: "5xl" }}
                      mb={12}
                      letterSpacing="tight"
                    >
                      BUILDING TRUST,
                      <br />
                      DELIVERING EXCELLENCE
                    </Heading>

                    {/* Features Grid */}
                    <Grid templateColumns="repeat(2, 1fr)" gap={10}>

                      {[
                        {
                          title: "Quality Craftsmanship",
                          text: "We are committed to delivering exceptional quality in every detail, from the foundation to the final finish.",
                          icon: CheckCircleIcon,
                        },
                        {
                          title: "Client-Centered Approach",
                          text: "We work closely with you throughout the process, aligning solutions with your goals.",
                          icon: StarIcon,
                        },
                        {
                          title: "Safety First",
                          text: "We prioritize safety on every site, protecting workers and maintaining top standards.",
                          icon: WarningIcon,
                        },
                        {
                          title: "Sustainable Practices",
                          text: "We use eco-friendly materials and techniques for efficient and responsible projects.",
                          icon: RepeatIcon,
                        },
                      ].map((item, i) => (
                        <Flex key={i} gap={4} align="flex-start">

                          <Box
                            bg="white"
                            p={3}
                            rounded="md"
                            shadow="sm"
                          >
                            <item.icon color="orange.400" boxSize={5} />
                          </Box>

                          <Box>
                            <Text fontWeight="semibold" mb={1}>
                              {item.title}
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              {item.text}
                            </Text>
                          </Box>

                        </Flex>
                      ))}

                    </Grid>
                  </Box>

                  {/* RIGHT SIDE IMAGE */}
                  <Box flex="1" position="relative">

                    {/* Badge */}
                    <Box
                      position="absolute"
                      top={4}
                      left={4}
                      bg="blackAlpha.700"
                      color="white"
                      px={6}
                      py={4}
                      rounded="md"
                      zIndex={1}
                    >
                      <Text fontSize="sm" color="orange.300">
                        Happy Customers
                      </Text>
                      <Heading size="2xl">500+</Heading>
                    </Box>

                    {/* Image */}
                    <Image
                      src={heroImg} // replace with your building image
                      alt="Building"
                      w="100%"
                      h={{ base: "350px", md: "500px" }}
                      objectFit="cover"
                      rounded="lg"
                      shadow="lg"
                    />

                  </Box>

                </Flex>
              </Container>
            </Box>

        {/* ================= SIGNATURE PROJECTS ================= */}
        <Box bg="white" w="100%">
          <Container maxW="7xl" py={16}>

            {/* Header */}
            <Flex justify="space-between" align="center" mb={10}>
              <Heading size="lg">Our Signature Projects</Heading>

              <Flex gap={3}>
                <IconButton
                  className="swiper-prev"
                  icon={<ArrowBackIcon />}
                  variant="ghost"
                  aria-label="Previous"
                />
                <IconButton
                  className="swiper-next"
                  icon={<ArrowForwardIcon />}
                  variant="ghost"
                  aria-label="Next"
                />
              </Flex>
            </Flex>

            {/* Carousel */}
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: ".swiper-prev",
                nextEl: ".swiper-next",
              }}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >

              {[
                {
                  img: car1,
                  title: "Modern Comforts, Stunning Views",
                },
                {
                  img: car2,
                  title: "Down Town Commercial Plaza",
                },
                {
                  img: car3,
                  title: "Green Field Eco Homes",
                },
                {
                  img: car4,
                  title: "Green Field Eco Homes",
                },
              ].map((project, i) => (
                <SwiperSlide key={i}>

                  <Box cursor="pointer" role="group">

                    <Image
                      src={project.img}
                      h="340px"
                      w="100%"
                      objectFit="cover"
                      rounded="md"
                    />

                    <Flex
                      justify="space-between"
                      align="center"
                      mt={4}
                    >
                      <Text fontWeight="medium">
                        {project.title}
                      </Text>

                      <Text
                        color="orange.400"
                        fontSize="xl"
                        _groupHover={{ transform: "translateX(4px)" }}
                        transition="0.2s"
                      >
                        ↗
                      </Text>
                    </Flex>

                  </Box>

                </SwiperSlide>
              ))}
            </Swiper>

            {/* Bottom progress line */}
            <Box
              mt={8}
              h="2px"
              bg="gray.300"
              position="relative"
            >
              <Box
                position="absolute"
                left={0}
                top={0}
                h="100%"
                w="30%"
                bg="orange.400"
              />
            </Box>

          </Container>
        </Box>
    {/* ================= FOOTER ================= */}
        <Box bg="black" color="gray.400" position="relative" overflow="hidden">

          <Container maxW="7xl" py={16}>

            <Grid
              templateColumns={{ base: "1fr", md: "2fr 1fr 2fr" }}
              gap={10}
            >

              {/* BRAND */}
              <Box>
                <Heading
                  fontSize="2xl"
                  mb={6}
                  letterSpacing="tight"
                >
                  Buni
                  <Text as="span" color="orange.500">
                    yaad
                  </Text>
                </Heading>

                <Text color="gray.500" maxW="300px">
                  A modern construction management platform helping teams
                  build faster, smarter, and better.
                </Text>
              </Box>

              {/* Follow */}
              <Box>
                <Text color="white" fontWeight="semibold" mb={4}>
                  Follow
                </Text>

                <VStack align="start" spacing={2}>
                  {["Instagram", "Twitter (X)", "LinkedIn", "Facebook"].map((item) => (
                    <Text key={item} _hover={{ color: "white" }} cursor="pointer">
                      {item}
                    </Text>
                  ))}
                </VStack>
              </Box>

              {/* CONTACT FORM */}
              <Box>
                <Text color="white" fontWeight="semibold" mb={4}>
                  Contact Us
                </Text>

                <VStack spacing={3} align="stretch">

                  <Input
                    placeholder="Your Name"
                    bg="gray.900"
                    borderColor="gray.700"
                    _focus={{ borderColor: "orange.400" }}
                  />

                  <Input
                    placeholder="Email Address"
                    bg="gray.900"
                    borderColor="gray.700"
                    _focus={{ borderColor: "orange.400" }}
                  />

                  <Textarea
                    placeholder="Message"
                    bg="gray.900"
                    borderColor="gray.700"
                    _focus={{ borderColor: "orange.400" }}
                    resize="none"
                  />

                  <Button
                    bg="orange.500"
                    color="black"
                    _hover={{ bg: "orange.400" }}
                  >
                    Send Message →
                  </Button>

                </VStack>
              </Box>

            </Grid>

            {/* Divider */}
            <Box borderTop="1px solid" borderColor="gray.800" mt={12} pt={6}>

              <Flex
                direction={{ base: "column", md: "row" }}
                justify="space-between"
                gap={4}
              >

                <Flex gap={6}>
                  <Text _hover={{ color: "white" }} cursor="pointer">
                    Privacy Policy
                  </Text>
                  <Text _hover={{ color: "white" }} cursor="pointer">
                    Terms & Conditions
                  </Text>
                </Flex>

                <Text fontSize="sm">
                  © 2026 Buniyaad. All rights reserved.
                </Text>

              </Flex>
            </Box>

          </Container>

          {/* BIG BACKGROUND BRAND TEXT — FIXED VISIBILITY */}
          <Heading
            position="absolute"
            bottom="-20px"
            left="50%"
            transform="translateX(-50%)"
            fontSize={{ base: "90px", md: "180px" }}
            fontWeight="extrabold"
            color="whiteAlpha.100"
            letterSpacing="tight"
            pointerEvents="none"
            userSelect="none"
          >
            Buni
            <Text as="span" color="orange.500" opacity={0.25}>
              yaad
            </Text>
          </Heading>

        </Box>



      </Box>
    </>
  );
}


///Landing page done for now, Baaki chnages baad main, for now -> login form chnages, check -> Dashboard FE. ->Complete all FE aqnd then go to BE, then integrate.