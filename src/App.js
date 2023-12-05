import "./App.css";

import { ChakraProvider, Box, Heading, VStack, HStack } from "@chakra-ui/react";

import LiquidityProviderBarChart from "./components/charts/LiquidityProviderBarChart";
import LiquidityProviderCardInfo from "./components/charts/LiquidityProviderCardInfo";
import OnChainVotingChart from "./components/charts/OnChainVotingBarChart";
import ConsensusVotingBarChart from "./components/charts/ConsensusVotingBarChart";
import TotalDelegatesAndVotesCard from "./components/charts/TotalDelegatesAndVotes";
import LiquidityProviderBubbleChart from "./components/charts/Bubble"; // Import the TreeSet component
import UserEngagementChart from "./components/charts/UserEngagementChart";
import VotesOverTimeChart from "./components/charts/VotesOverTimeChart";
import DelegatesOverTimeChart from "./components/charts/DelegatesOverTimeChart";

function App() {
  return (
    <ChakraProvider>
      <Box p={5}>
        <Heading mb={5}>Liquidity Provider Performance</Heading>
        <VStack spacing={4}>
          <LiquidityProviderBarChart />
          <LiquidityProviderCardInfo />
        </VStack>

        <Heading my={5}>UNI Votes and Delegates Over Time</Heading>
        <HStack spacing={4}>{/* charts */}
            <VotesOverTimeChart />
            <DelegatesOverTimeChart />
        </HStack>

        <Heading my={5}>Voter Consistency</Heading>
        <VStack spacing={4}>
          <UserEngagementChart />
        </VStack>

        <VStack spacing={4}>{/* charts */}</VStack>

                <Heading my={5}>Tokenomics Overview</Heading>
                <VStack spacing={4}>{/* charts */}</VStack>

                <Heading my={5}>Voter Distribution(On-Chain vs Off-Chain)</Heading>
                <VStack spacing={4}>
                    <OnChainVotingChart />
                    <ConsensusVotingBarChart />
                    <TotalDelegatesAndVotesCard />
                </VStack>
            </Box>
        </ChakraProvider>
    );
}

export default App;
