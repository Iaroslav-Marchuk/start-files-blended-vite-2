import { FiSearch } from 'react-icons/fi';
import style from './Form.module.css';
import { nanoid } from 'nanoid';

const Form = ({ onAddTodo }) => {
  const handleSubmit = event => {
    event.preventDefault();
    const inputValue = event.target.elements.search.value.trim();

    if (!inputValue) return;

    onAddTodo({ id: `id-${nanoid()}`, text: inputValue });
    event.target.reset();
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <button className={style.button} type="submit">
        <FiSearch size="16px" />
      </button>

      <input
        className={style.input}
        placeholder="What do you want to write?"
        name="search"
        required
        autoFocus
      />
    </form>
  );
};

export default Form;
