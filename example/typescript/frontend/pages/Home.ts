// Corvid generates page names with unique suffix, we're not repeating it in the file name.
// This page will be copied to e.g. "src/pages/Home.zvcx/Home.js"
import { pick } from 'lodash';
import { getTodoItems } from 'backend/backend-api';
import { getDefaultId } from 'public/universal/todo-item';
import { getDefaultTitle } from 'public/common-frontend-code';

$w.onReady(async () => {
  console.info('Todos', pick((await getTodoItems()).items[0], 'id'));
  console.info('Default id', getDefaultId());
  console.info('Default title', getDefaultTitle());
});
