import React, { useState, useEffect } from "react";
import { Box, Flex, Text, useTheme, Spinner } from "@chakra-ui/react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import axios from "axios";

const transformData = (rows) => {
    // Update this function according to the new data structure
    const dataMap = new Map();
    
    rows.reverse().forEach((row) => {
        console.log(row.day);
        if (!dataMap.has(row.day)) {
            dataMap.set(row.day, {
                day: row.day,
                delegates: 0
                // Adjust these fields based on the new data
            });
        }
        dataMap.get(row.day).delegates += row.delegates; // Update this logic if needed
    });

    return Array.from(dataMap.values());
};

const DelegatesOverTimeChart = () => {
    const api_key = process.env.REACT_APP_DUNE_API_KEY;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    `https://api.dune.com/api/v1/query/2211747/results?api_key=${api_key}`
                );
                const formattedData = transformData(result.data.result.rows);
                console.log(result);
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
                Delegates Over Time
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
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="delegates" fill={theme.colors.red[400]} />
                </BarChart>
            </Box>
        </Box>
    );
};

export default DelegatesOverTimeChart;