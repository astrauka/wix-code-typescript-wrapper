// Backend API
import wixData from 'wix-data';

export async function getTodoItems() {
  return wixData.query('Todos').find();
}
