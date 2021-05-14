import { getDefaultId } from './universal/todo-item';
// Data hooks
export async function TodoItems_beforeInsert(todoItem) {
    return {
        id: getDefaultId(),
        ...todoItem,
    };
}
