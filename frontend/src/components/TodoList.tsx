// クライアントコンポーネント
"use client" // ←※※注意ポイント①※※

// 必要なライブラリとコンポーネントをインポート
import React, { useState } from 'react';
import TodoItem from './TodoItem';

const TodoList = () => {
    // タスクと新しいタスク入力を管理するためのuseState
    // stateを更新するとレンダリングのトリガーが惹かれる
    const [tasks, setTasks] = useState<Array<{ task: string; completed: boolean }>>([]); // ←※※注意ポイント②※※
    const [newTask, setNewTask] = useState('');

    // タスク配列に新しいタスクを追加する関数
    const addTask = () => {
        // 新しいタスク入力が空でないことを確認
        if (newTask.trim()) {
            // 新しいタスクでタスク配列を更新
            setTasks([...tasks, { task: newTask, completed: false }]);
            // 新しいタスク入力フィールドをリセット
            setNewTask('');
        }
    };

    // タスクを削除する
    const removeTask = (index: number) => {
        // タスク配列のコピーを作成
        const newTasks = [...tasks];        

        // タスク配列から指定されたタスクを削除        
        newTasks.splice(index, 1); 

        // タスク配列のステートを更新
        setTasks(newTasks);
    };

    return (
        <div className="p-4">
            {/* 新しいタスクを追加するための入力フィールド */}
            <input
                type="text"
                placeholder="Add a task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTask()}
                className="p-2 border rounded w-full mb-8"
            />
            
            {/* タスクのリストをレンダリング */}
            <div>
                {tasks.map((task, index) => (
                    <TodoItem
                        key={index} // ←※※注意ポイント③※※
                        task={task.task}
                        // removeTask関数をTodoItemに渡す
                        toggleCompletion={() => removeTask(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default TodoList;
