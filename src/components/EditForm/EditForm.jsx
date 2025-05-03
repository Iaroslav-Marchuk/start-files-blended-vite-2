import { RiSaveLine } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';
import toast from 'react-hot-toast';
import style from './EditForm.module.css';

const EditForm = ({ id, defaultValue, onUpdate, onCancel, onCheck }) => {
  const handleSubmit = event => {
    event.preventDefault();
    const updatedText = event.target.elements.text.value;
    if (!onCheck(updatedText)) {
      onUpdate(id, updatedText);
      toast.success('Successfully updated!');
    } else {
      toast.error('Todo with the same text already exists!');
    }
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <button className={style.submitButton} type="submit">
        <RiSaveLine color="green" size="16px" />
      </button>

      <button className={style.editButton} type="button" onClick={onCancel}>
        <MdOutlineCancel color="red" size="16px" />
      </button>

      <input
        className={style.input}
        placeholder="What do you want to write?"
        name="text"
        required
        defaultValue={defaultValue}
        autoFocus
      />
    </form>
  );
};
export default EditForm;
