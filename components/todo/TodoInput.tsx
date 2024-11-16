'use client';

import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface TodoInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}

export function TodoInput({ value, onChange, onAdd }: TodoInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAdd();
    }
  };

  return (
    <Card className="p-6 shadow-lg">
      <div className="flex gap-4">
        <Input
          placeholder="Add a new todo..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button onClick={onAdd}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add
        </Button>
      </div>
    </Card>
  );
}