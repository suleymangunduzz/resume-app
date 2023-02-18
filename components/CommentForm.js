import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './commentForm.module.css';

export default function CommentForm() {
  const [resetForm, setResetForm] = useState(false);
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
      await fetch(`${__BASE_API_URL__}/comments/add`, {
        body: JSON.stringify({ ...data, show: false }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
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
}
