import List from '@mui/material/List';
import TodoItem from './TodoItem';
import { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Navbar from './Navbar';
import { Box, Typography } from '@mui/material';

const getInitialData = () => {
    const data = JSON.parse(localStorage.getItem("todos"))
    if (!data) return []
    return data
}

export default function TodoList() {
    const [todos, setTodos] = useState(getInitialData());

    useEffect(() => {
        localStorage.setItem(
            "todos", JSON.stringify(todos)
        )
    }, [todos])

    const deleteTodoFunc = (id) => {
        setTodos((prevTodos) => {
            return prevTodos.filter((t) => t.id !== id)
        })
    }

    const toggle = (id) => {
        setTodos((prevTodos) => {
            return prevTodos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed }
                } else {
                    return todo;
                };
            });
        });
    }

    const addTodo = (text) => {
        setTodos(prevTodos => {
            return [...prevTodos, { text: text, id: crypto.randomUUID(), completed: false }]
        })
    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center', // Added to arrange items in a column
            m: 3,
        }}>
            <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
                Todos
            </Typography>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {todos.map(todo => (
                    <TodoItem key={todo.id} deleteTodo={() => deleteTodoFunc(todo.id)} toggle={() => toggle(todo.id)} todo={todo} />
                ))}
                <TodoForm addTodo={addTodo} />
            </List>
        </Box>
    )
}
