import { Form, Input } from "antd";
import { useEffect } from "react";

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { span: 16, push: 4 },
};

const NoteForm = ({
    footer,
    onFinish,
    defaultValues = { title: "", content: "" },
}: any) => {
    const [form] = Form.useForm();

    return (
        <Form
            {...layout}
            form={form}
            onFinish={() => {
                onFinish({
                    title: form.getFieldValue("title"),
                    content: form.getFieldValue("content"),
                });
            }}
            style={{ width: "100%" }}
            initialValues={defaultValues}
        >
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item
                name="content"
                label="Content"
                rules={[{ required: true }]}
            >
                <Input.TextArea
                    rows={12}
                    placeholder="maxLength: 800"
                    maxLength={800}
                />
            </Form.Item>

            <Form.Item {...tailLayout}>{footer}</Form.Item>
        </Form>
    );
};

export default NoteForm;
