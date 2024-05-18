"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, CardActionArea, CircularProgress } from '@mui/material';

const Index = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get('http://localhost:8080/events');
                setEvents(res.data);
            } catch {
                console.log("error has occurred in /src/app/event/page.tsx");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }


    return (
        <Box sx={{ padding: 4 }} >
            <Typography variant="h4" component="h1" gutterBottom>
                ここはイベント一覧
            </Typography>
            {events.length > 0 ? (
                events.map((e, index) => (
                    <a href={`/events/${e.ID}`}>
                    <Card key={index} sx={{ marginBottom: 2 }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {e.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {e.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    </a>
                ))
            ) : (
                <Typography variant="body1">No events found</Typography>
            )}            
        </Box>
    );
};

export default Index;
