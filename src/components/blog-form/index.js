import React from "react";
import { Button, Form, Input } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} is required!",
  string: {
    min: "${label} must be between ${min} to ${max} characters",
    max: "${label} must be between ${min} to ${max} characters",
  },
};

function BlogForm({ blog, setBlog, loading, onSubmit, editingBlog, onUpdate }) {
  return (
    <>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={(value) => {
          if (editingBlog.status) {
            onUpdate(value);
          } else {
            onSubmit(value);
          }
        }}
        style={{
          maxWidth: 600,
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["title"]}
          rules={[
            {
              required: true,
              min: 5,
              max: 50,
            },
          ]}
        >
          <Input
            value={blog.title}
            onChange={(newValue) =>
              setBlog({ ...blog, title: newValue.target.value })
            }
          />
        </Form.Item>
        <Form.Item
          name={["body"]}
          rules={[
            {
              required: true,
              min: 100,
              max: 3000,
            },
          ]}
        >
          <Input.TextArea
            value={blog.body}
            onChange={(newValue) =>
              setBlog({ ...blog, body: newValue.target.value })
            }
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            loading={loading}
            htmlType="submit"
            style={{ backgroundColor: "#7749F8", color: "#ffffff" }}
          >
            {editingBlog.status ? "Update Blog" : "Publish Blog"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default BlogForm;
