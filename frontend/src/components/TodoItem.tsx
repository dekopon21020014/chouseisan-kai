// 必要なライブラリをインポート
import React from 'react';
import Options from '../components/Options';
import Image from 'next/image'

const TodoItem = (props: { task: string; toggleCompletion: () => void; }) => { // ←注意ポイント④
    return (
        <div className="flex justify-between p-2 border-b bg-white mb-5">
            {/* タスクテキストを表示 */}
            <span className="flex-1">{props.task}</span>

            {/* toggleCompletion関数をトリガーするボタン */}
            <Options />
            {/*
            <button onClick={props.toggleCompletion} className="text-xl">
                ✓
            </button>
            <Image src="/check.png" alt="Sample Image" width={50} height={50} objectFit="contain" />
            <Image src="/ta.png" alt="Sample Image" width={50} height={50} objectFit="contain" /> 
            <Image src="/class.png" alt="Sample Image" width={50} height={50} objectFit="contain" /> 
            <Image src="/Unavailable.png" alt="Sample Image" width={50} height={50} objectFit="contain" /> 
            <Image src="/cannot.jpeg" alt="Sample Image" width={50} height={50} objectFit="contain" /> 
            */}
        </div>
    );
};

export default TodoItem;
