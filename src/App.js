import "./App.css";

import { ChakraProvider, Box, Heading, VStack } from "@chakra-ui/react";

import LiquidityProviderBarChart from "./components/charts/LiquidityProviderBarChart";
import LiquidityProviderCardInfo from "./components/charts/LiquidityProviderCardInfo";
import OnChainVotingChart from "./components/charts/OnChainVotingChart";

function App() {
    return (
        <ChakraProvider>
            <Box p={5}>
                <Heading mb={5}>Liquidity Provider Performance</Heading>
                <VStack spacing={4}>
                    <LiquidityProviderBarChart />
                    <LiquidityProviderCardInfo />
                    <LiquidityProviderBarChart />
                    <LiquidityProviderBarChart />
                </VStack>

                <Heading my={5}>Voting Participation</Heading>
                <VStack spacing={4}>{/* charts */}</VStack>

                <Heading my={5}>Overall User Engagement</Heading>
                <VStack spacing={4}>{/* charts */}</VStack>

                <Heading my={5}>Tokenomics Overview</Heading>
                <VStack spacing={4}>{/* charts */}</VStack>

                <Heading my={5}>On Chain Voting Statistics</Heading>
                <VStack spacing={4}>{
                    <OnChainVotingChart />
                }</VStack>
            </Box>
        </ChakraProvider>
    );
}

export default App;
