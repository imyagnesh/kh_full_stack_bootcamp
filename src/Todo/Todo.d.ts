export type TodoItemType = {
    id: number;
    text: string;
    isCompleted: boolean;
    isEditing: boolean;
  };

export type FilterStatus = 'all' | 'pending' | 'completed';
