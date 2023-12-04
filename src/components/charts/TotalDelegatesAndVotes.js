import React, { useState, useEffect } from "react";
import { Box, Text, useTheme, Spinner } from "@chakra-ui/react";
import axios from "axios";

const TotalDelegatesAndVotesCard = () => {
    const api_key = process.env.REACT_APP_DUNE_API_KEY;
    const [totalData, setTotalData] = useState(null);
    const [loading, setLoading] = useState(true);
    // const theme = useTheme();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    `https://api.dune.com/api/v1/query/2211747/results?api_key=${api_key}`
                );
                const { delegates, votes } = result.data.result.rows[0];
                setTotalData({ delegates, votes });
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
            <Box p={4} boxShadow="lg" rounded="md" bg="white">
                <Spinner />
            </Box>
        );
    }

    return (
        <Box p={4} boxShadow="lg" rounded="md" bg="white">
            <Text fontSize="2xl" fontWeight="bold" mb={2}>
                Total Delegates and Votes for UNI Over Time
            </Text>
            <Text fontSize="xl">
                Total Delegates: {totalData.delegates}
            </Text>
            <Text fontSize="xl">
                Total Votes: {totalData.votes}
            </Text>
        </Box>
    );
};

export default TotalDelegatesAndVotesCard;
