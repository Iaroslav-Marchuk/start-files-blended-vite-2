import Grid from '../Grid/Grid';
import GridItem from '../GridItem/GridItem';
import TodoListItem from '../TodoListItem/TodoListItem';

const TodoList = ({ todosList, onDelete, onEdit }) => {
  return (
    <Grid>
      {todosList.map((todoItem, index) => (
        <GridItem key={todoItem.id}>
          <TodoListItem
            todoData={todoItem}
            index={index}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </GridItem>
      ))}
    </Grid>
  );
};

export default TodoList;
