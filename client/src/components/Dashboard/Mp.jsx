// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "./Mp/assets/img/dashboards/usa.jpg";
// Custom components
import "./Mp/assets/css/App.css";
import MiniCalendar from "./Mp/components/calendar/MiniCalendar";
import MiniStatistics from "./Mp/components/card/MiniStatistics";
import IconBox from "./Mp/components/icons/IconBox";
import React from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CheckTable from "./Mp/components/CheckTable";
import ComplexTable from "./Mp/components/ComplexTable";
import DailyTraffic from "./Mp/components/DailyTraffic";
import PieCard from "./Mp/components/PieCard";
import Tasks from "./Mp/components/Tasks";
import TotalSpent from "./Mp/components/TotalSpent";
import WeeklyRevenue from "./Mp/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "./Mp/variables/columnsData";
import tableDataCheck from "./Mp/variables/tableDataCheck.json";
import tableDataComplex from "./Mp/variables/tableDataComplex.json";
import { extendTheme } from "@chakra-ui/react";
import { CardComponent } from "./Mp/theme/additions/card/card";
import { ChakraProvider } from "@chakra-ui/react";
import { globalStyles } from "./Mp/theme/styles";

export default function Mp() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("black", "black");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <main className="main-container">
      <ChakraProvider
        resetScope=".ck-reset"
        resetCSS={false}
        theme={extendTheme(globalStyles, CardComponent)}
      >
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
            gap="20px"
            mb="20px"
          >
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdBarChart}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Commission Earnings"
              value="1090,80 TND"
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdAttachMoney}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Spend this month"
              value="499,76 TND"
            />
            <MiniStatistics growth="+23%" name="Sales" value="1787" />
            <MiniStatistics
              endContent={
                <Flex me="-16px" mt="10px">
                  <FormLabel htmlFor="balance">
                    <Avatar src={Usa} />
                  </FormLabel>
                  <Select
                    id="balance"
                    variant="mini"
                    mt="5px"
                    me="0px"
                    defaultValue="usd"
                  >
                    <option value="usd">TND</option>
                    <option value="eur">EUR</option>
                    <option value="gba">USD</option>
                  </Select>
                </Flex>
              }
              name="Your balance"
              value="1,000 TND"
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
                  icon={<Icon w="28px" h="28px" as={MdAddTask} color="white" />}
                />
              }
              name="New Sellers"
              value="154"
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdFileCopy}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Best Seller"
              value="Decathlon"
            />
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
            <TotalSpent />
            <WeeklyRevenue />
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
            <CheckTable
              columnsData={columnsDataCheck}
              tableData={tableDataCheck}
            />
            <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
              <DailyTraffic />
              <PieCard />
            </SimpleGrid>
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
            <ComplexTable
              columnsData={columnsDataComplex}
              tableData={tableDataComplex}
            />
            <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
              <Tasks />
              <MiniCalendar h="100%" minW="100%" selectRange={false} />
            </SimpleGrid>
          </SimpleGrid>
        </Box>
      </ChakraProvider>
    </main>
  );
}
