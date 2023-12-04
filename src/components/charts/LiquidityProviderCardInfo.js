import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Spinner, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import axios from "axios";

const transformData = (rows) => {
    const dataMap = new Map();

    rows.forEach((row) => {
        if (!dataMap.has(row.id)) {
            dataMap.set(row.id, {
                proposal_id: row.id,
                onchain: 0,
                consensus: 0,
                temperature: 0,
            });
        }
        dataMap.get(row.id)[row.type] += row.votes;
    });

    return Array.from(dataMap.values());
};

const LiquidityProviderCard = ({ data }) => {
    return (
        <Box boxShadow="lg" p={4} rounded="md" bg="white">
            <Text fontSize="2xl" mb={4} fontWeight="bold">
                Liquidity Provider Vote Participation
            </Text>
            {data.map((item) => (
                <Box key={item.proposal_id} mb={4}>
                    <Text fontSize="xl" mb={2}>Proposal ID: {item.proposal_id}</Text>
                    <Flex justifyContent="space-between">
                        <Stat>
                            <StatLabel>Onchain Votes</StatLabel>
                            <StatNumber>{item.onchain}</StatNumber>
                        </Stat>
                        <Stat>
                            <StatLabel>Consensus Votes</StatLabel>
                            <StatNumber>{item.consensus}</StatNumber>
                        </Stat>
                        <Stat>
                            <StatLabel>Temperature Votes</StatLabel>
                            <StatNumber>{item.temperature}</StatNumber>
                        </Stat>
                    </Flex>
                </Box>
            ))}
        </Box>
    );
};

const LiquidityProviderCardInfo = () => {
    const api_key = process.env.REACT_APP_DUNE_API_KEY;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    `https://api.dune.com/api/v1/query/2207202/results?api_key=${api_key}`
                );
                const formattedData = transformData(result.data.result.rows);
                setData(formattedData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [api_key]);

    if (loading) {
        return (
            <Flex justify="center" align="center" h="100%">
                <Spinner />
            </Flex>
        );
    }

    return (
        <Box p={4}>
            <LiquidityProviderCard data={data} />
        </Box>
    );
};

export default LiquidityProviderCardInfo;