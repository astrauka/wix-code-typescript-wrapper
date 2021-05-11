import { getDefaultId, TodoItem } from './universal/todo-item';

// Data hooks
export async function TodoItems_beforeInsert(todoItem: TodoItem) {
  return {
    id: getDefaultId(),
    ...todoItem,
  };
}
