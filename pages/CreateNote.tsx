import NoteForm from "../components/NoteForm";
import { FC } from "react";
import { Typography, Button, message } from "antd";
import { useRouter } from "next/router";

const CreateNote: FC = () => {
    const router = useRouter();
    const { noteId } = router.query;

    return (
        <>
            <Typography.Title style={{ margin: "30px 0", textAlign: "center" }}>
                Create Note
            </Typography.Title>
            <NoteForm
                onFinish={async (form: any) => {
                    try {
                        const res = await fetch("http://localhost:3001/notes", {
                            method: "POST",
                            mode: "cors",
                            cache: "no-cache",
                            credentials: "same-origin",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            redirect: "follow",
                            referrerPolicy: "no-referrer",
                            body: JSON.stringify({
                                // id: noteId,
                                createdOn: new Date().toLocaleString(),
                                ...form,
                            }),
                        });

                        if (res.status === 200 || res.status === 201) {
                            message.success(
                                `Created note: ${form.title}.\nRedirecting to home page...`
                            );
                            setTimeout(() => router.push("/", "/"), 350);
                        }
                    } catch {
                        message.error(`An unknown error occured.`);
                    }
                }}
                footer={
                    <>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            block
                            style={{ marginBottom: "10px" }}
                        >
                            Apply
                        </Button>

                        <Button
                            type="ghost"
                            danger
                            size="large"
                            block
                            onClick={() => router.push("/", "/")}
                        >
                            Cancel
                        </Button>
                    </>
                }
            />
        </>
    );
};

export default CreateNote;
