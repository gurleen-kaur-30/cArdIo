import { useState } from 'react';
import dashify from 'dashify';
import axios from 'axios';

const Post = () => {
  const [content, setContent] = useState({
    email: undefined,
    password: undefined,
  })
  const onChange = (e) => {
    const { value, name } = e.target;
    setContent(prevState => ({ ...prevState, [name]: value }));
  }
  const onSubmit = async () => {
    const { email, password } = content;
    await axios.post('/api/user', { email, slug: dashify(email), password });
  }
  return (
    <div>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        value={content.email}
        onChange={onChange}
      />
      <label htmlFor="password">Password</label>
      <textarea
        name="password"
        value={content.password}
        onChange={onChange}
      />
      <button onClick={onSubmit}>POST</button>
    </div>
  );
};

export default Post;
