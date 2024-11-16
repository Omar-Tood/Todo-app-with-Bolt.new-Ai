'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { TodoItem } from '@/components/todo/TodoItem';
import { TodoInput } from '@/components/todo/TodoInput';
import { ThemeToggle } from '@/components/theme/theme-toggle';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const { toast } = useToast();

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }]);
      setNewTodo('');
      toast({
        title: "Todo added",
        description: "Your new todo has been added successfully.",
      });
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
    toast({
      title: "Todo deleted",
      description: "The todo has been removed from your list.",
      variant: "destructive",
    });
  };

  const startEditing = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const updateTodo = (id: number, newText: string) => {
    if (newText.trim()) {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      ));
      setEditingTodo(null);
      toast({
        title: "Todo updated",
        description: "Your todo has been updated successfully.",
      });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-foreground">
              Todo List
            </h1>
            <p className="text-muted-foreground mt-2">
              Stay organized and productive
            </p>
          </div>
          <ThemeToggle />
        </div>

        <TodoInput
          value={newTodo}
          onChange={setNewTodo}
          onAdd={addTodo}
        />

        <div className="space-y-4">
          {todos.length === 0 ? (
            <Card className="p-8 text-center text-muted-foreground">
              <p>No todos yet. Add some tasks to get started!</p>
            </Card>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                {...todo}
                isEditing={editingTodo?.id === todo.id}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={startEditing}
                onUpdate={updateTodo}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}