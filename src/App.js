import "./App.css";

import { ChakraProvider, Box, Heading, VStack } from "@chakra-ui/react";

import LiquidityProviderBarChart from "./components/charts/LiquidityProviderBarChart";
import LiquidityProviderCardInfo from "./components/charts/LiquidityProviderCardInfo";
import OnChainVotingChart from "./components/charts/OnChainVotingBarChart";
import ConsensusVotingBarChart from "./components/charts/ConsensusVotingBarChart";
import TotalDelegatesAndVotesCard from "./components/charts/TotalDelegatesAndVotes";
import LiquidityProviderBubbleChart from "./components/charts/Bubble"; // Import the TreeSet component

function App() {
  return (
    <ChakraProvider>
      <Box p={5}>
        <Heading mb={5}>Liquidity Provider Performance</Heading>
        <VStack spacing={4}>
          <LiquidityProviderBarChart />
          <LiquidityProviderCardInfo />
          <LiquidityProviderBubbleChart/>
        </VStack>

        <Heading my={5}>Voting Participation</Heading>
        <VStack spacing={4}>{/* charts */}</VStack>

        <Heading my={5}>Overall User Engagement</Heading>
        <VStack spacing={4}>{/* charts */}</VStack>

                <Heading my={5}>Tokenomics Overview</Heading>
                <VStack spacing={4}>{/* charts */}</VStack>

                <Heading my={5}>Uniswap On Chain Voting Statistics</Heading>
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
