"use client"
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const Show = () => {
    const [event, setEvents] = useState<any>(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/events/${id}`);
                setEvents(res.data);
            } catch (error) {
                console.log("error has occurred in /src/app/event/page.tsx", error);
            }
        };

        if (id) { 
            fetchEvent();
        }
    }, [id]);

    return (
        <Container maxWidth="md" style={{ marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom>
                イベント詳細
            </Typography>
            {event ? (
                <Card>
                    <CardContent>
                        <Typography variant="h6" component="div" gutterBottom>
                            ID: {event.ID}
                        </Typography>
                        <Typography variant="body1" component="div" gutterBottom>
                            名前: {event.name}
                        </Typography>
                        <Typography variant="body1" component="div">
                            説明: {event.description}
                        </Typography>
                        {/* 他のイベントの詳細情報を表示 */}
                    </CardContent>
                </Card>
            ) : (
                <Typography variant="body1">
                    ロード中...
                </Typography>
            )}
        </Container>
    );
};

export default Show;

