import React, { useState, useEffect } from "react";
import { Box, Flex, Text, useTheme, Spinner } from "@chakra-ui/react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import axios from "axios";

const transformData = (rows) => {
    // Modify this function based on the structure of your new data
    const dataMap = new Map();

    rows.forEach((row) => {
        if (!dataMap.has(row.id)) {
            dataMap.set(row.id, {
                proposal_id: row.id,
                voter_different: 0,
                voter_same: 0
                // Add or modify fields based on new data
            });
        }
        dataMap.get(row.id).voter_different += row.voter_different;
        dataMap.get(row.id).voter_same += row.voter_same;
        // Update the data mapping logic
    });

    return Array.from(dataMap.values());
};

const UserEngagementChart = () => {
    const api_key = process.env.REACT_APP_DUNE_API_KEY;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    `https://api.dune.com/api/v1/query/2207623/results?api_key=${api_key}`
                );
                console.log(result);
                const formattedData = transformData(result.data.result.rows);
                console.log(formattedData);
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
                Voter Consistency
            </Text>
            <Box boxShadow="lg" p={4} rounded="md" bg="white">
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
                    {/* Update these Bars based on your new data fields */}
                    <Bar dataKey="voter_same" fill={theme.colors.gray[400]} />
                    <Bar dataKey="voter_different" fill={theme.colors.red[400]} />
                    {/* Add or remove Bars as needed */}
                </BarChart>
            </Box>
        </Box>
    );
};

export default UserEngagementChart;