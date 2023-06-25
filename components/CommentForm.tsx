import { addComment } from '@/service';
import { useEffect, useState, FC } from 'react';
import { useForm } from 'react-hook-form';
import styles from './commentForm.module.css';

// TODO: Fix the types for the entire file.
// TODO: Remove the react-hook-form dependency, use the simple form instead.
const CommentForm: FC = () => {
  const [resetForm, setResetForm] = useState<boolean>(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (resetForm) {
      reset();
    }
  }, [reset, resetForm]);

  const onSubmit = async (data) => {
    try {
      await addComment(data);
    } catch (error) {
      console.log({ error });
    } finally {
      setResetForm(true);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <label>
        Name
        <input {...register('name', { required: true })} />
      </label>
      <label>
        Title
        <input {...register('title', { required: true })} />
      </label>
      <label>
        Company
        <input {...register('companyName', { required: true })} />
      </label>
      <label>
        Message
        <textarea {...register('description', { required: true })} />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
