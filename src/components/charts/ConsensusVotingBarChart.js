import React, { useState, useEffect } from "react";
import { Box, Flex, Text, useTheme, Spinner } from "@chakra-ui/react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import axios from "axios";

const transformData = (rows) => {
    const dataMap = new Map();

    rows.forEach((row) => {
        if (!dataMap.has(row.id)) {
            dataMap.set(row.id, {
                proposal_id: row.id,
                consensus_votes: 0,
            });
        }
        dataMap.get(row.id).consensus_votes += row.votes;
    });

    return Array.from(dataMap.values());
};

const ConsensusVotingBarChart = () => {
    const api_key = process.env.REACT_APP_DUNE_API_KEY;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    `https://api.dune.com/api/v1/query/2205751/results?api_key=${api_key}`
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
            <Text fontSize="2xl" mb={4} fontWeight="bold">
                Consensus Voting Participation
            </Text>
            <Box boxShadow="lg" p={4} rounded="md" bg="white">
                <Text fontSize="xl" mb={4}>
                    Vote Participation Rate
                </Text>
                <BarChart
                    width={800}
                    height={400}
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey="proposal_id" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="consensus_votes" fill={theme.colors.purple[400]} />
                    {}
                </BarChart>
            </Box>
        </Box>
    );
};

export default ConsensusVotingBarChart;
