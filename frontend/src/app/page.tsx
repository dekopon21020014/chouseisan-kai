"use client"
import React from 'react';

// Todoアプリの中身
const Home = () => {
    return (
        <div className="container mx-auto p-8 text-center max-w-2xl">
            <h1 className="text-2xl mb-4">ようこそ調整さん改へ</h1> 
            <a href="/events/new/">新しいイベント</a>
        </div>
    );
};

export default Home;