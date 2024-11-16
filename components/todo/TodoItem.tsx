'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, Pencil, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  isEditing: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: { id: number; text: string; completed: boolean }) => void;
  onUpdate: (id: number, text: string) => void;
}

export function TodoItem({
  id,
  text,
  completed,
  isEditing,
  onToggle,
  onDelete,
  onEdit,
  onUpdate,
}: TodoItemProps) {
  const [editText, setEditText] = useState(text);

  const handleUpdate = () => {
    onUpdate(id, editText);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUpdate();
    }
  };

  return (
    <Card className={`p-4 flex items-center justify-between transition-colors ${
      completed ? 'bg-muted' : ''
    }`}>
      <div className="flex items-center gap-3 flex-1">
        <Checkbox
          checked={completed}
          onCheckedChange={() => onToggle(id)}
        />
        {isEditing ? (
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
            autoFocus
          />
        ) : (
          <span className={`${
            completed
              ? 'text-muted-foreground line-through'
              : 'text-foreground'
          }`}>
            {text}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {isEditing ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleUpdate}
          >
            <Save className="h-5 w-5 text-green-500" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit({ id, text, completed })}
          >
            <Pencil className="h-5 w-5 text-blue-500" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(id)}
        >
          <XCircle className="h-5 w-5 text-destructive" />
        </Button>
      </div>
    </Card>
  );
}