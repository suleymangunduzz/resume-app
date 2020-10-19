import { Form, Input, Button } from 'antd';

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
}

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  }
}

export default function CommentForm() {
  const onFinish = async (values) => {
    const requestBody = {...values.user, show: false};

    const response = await fetch(
      'https://resume-backend-app.herokuapp.com/comments/add',
      {
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    );

    if (response.status === 200) {
      alert('Your message sent successfully...')
    }
  }

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        name={['user', 'name']}
        label="Name"
        rules={[{
          required: true
        }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'title']}
        label="Title"
        rules={[{
            required: true
          }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'companyName']}
        label="Company"
        rules={[{
            required: true,
          }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'description']} label="Your message" rules={[{ required: true}]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};