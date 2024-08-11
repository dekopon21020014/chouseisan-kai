"use client"
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const positionOptions = ['Professor', 'D3', 'D2', 'D1', 'M2', 'M1', 'B4', 'B3', 'B2', 'B1'];

const Show = () => {
    const [event, setEvent] = useState<any>(null);
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [responses, setResponses] = useState<{[key: string]: string}>({});
    const { id } = useParams();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/events/${id}`);
                setEvent(res.data);
                const initialResponses = res.data.options.reduce((acc: {[key: string]: string}, option: string) => {
                    acc[option] = '';
                    return acc;
                }, {});
                setResponses(initialResponses);
            } catch (error) {
                console.log("error has occurred in /src/app/event/page.tsx", error);
            }
        };

        if (id) { 
            fetchEvent();
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("name = ", name)
        console.log("position = ", position)
        console.log("response = ", responses)
        try {
            await axios.post(`http://localhost:8080/events/${id}/responses`, {
                name,
                position,
                responses
            });
            alert('回答が送信されました');
        } catch (error) {
            console.error('回答の送信中にエラーが発生しました', error);
            alert('回答の送信に失敗しました');
        }
    };

    const handleResponseChange = (option: string, value: string) => {
        setResponses(prev => ({ ...prev, [option]: value }));
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom>
                イベント詳細と回答フォーム
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
                        <Typography variant="body1" component="div" gutterBottom>
                            説明: {event.description}
                        </Typography>
                        
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="あなたの名前"
                                fullWidth
                                margin="normal"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="position-select-label">役職</InputLabel>
                                <Select
                                    labelId="position-select-label"
                                    value={position}
                                    label="役職"
                                    onChange={(e) => setPosition(e.target.value)}
                                    required
                                >
                                    {positionOptions.map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="h6" gutterBottom>
                                    日程の選択
                                </Typography>
                                {event.options.map((option: string, index: number) => (
                                    <FormControl component="fieldset" key={index} fullWidth sx={{ mb: 2 }}>
                                        <FormLabel component="legend">{option}</FormLabel>
                                        <RadioGroup
                                            row
                                            value={responses[option]}
                                            onChange={(e) => handleResponseChange(option, e.target.value)}
                                        >
                                            <FormControlLabel value="○" control={<Radio />} label="○" />
                                            <FormControlLabel value="△" control={<Radio />} label="△" />
                                            <FormControlLabel value="×" control={<Radio />} label="×" />
                                        </RadioGroup>
                                    </FormControl>
                                ))}
                            </Box>
                            
                            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                                回答を送信
                            </Button>
                        </form>
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