// Backend API, will be exposed as web module - backend-api.jsw
import wixData from 'wix-data';

export async function getTodoItems() {
  return wixData.query('Todos').find();
}
