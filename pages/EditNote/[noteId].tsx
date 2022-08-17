import NoteForm from "../../components/NoteForm";
import { NextPage } from "next";

import { Alert, Typography, Skeleton, Button, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import ActionTypes from "../../state/ActionTypes";

const EditNote: NextPage = ({ state, dispatch }: any) => {
    const router = useRouter();
    const { noteId } = router.query;

    const [noteInfo, setNoteInfo] = useState({
        loading: true,
        error: false,
        errorMessage: "",
        title: "",
        content: "",
        createdOn: "",
    });

    useEffect(() => {
        if (!router.isReady) return;

        const getNoteData = async () => {
            const response = await fetch(
                `http://localhost:3001/notes/${noteId}`,
                { method: "GET" }
            );

            if (response.status === 404) {
                setNoteInfo({
                    ...noteInfo,
                    loading: false,
                    error: true,
                    errorMessage: `Note doesn't exist.`,
                });
            } else if (response.status !== 200) {
                setNoteInfo({
                    ...noteInfo,
                    loading: false,
                    error: true,
                    errorMessage: `An unknown error occured.`,
                });
            } else {
                const jsonResponse = await response.json();
                setTimeout(() => {
                    setNoteInfo({
                        loading: false,
                        ...jsonResponse,
                    });
                }, 200);
            }
        };

        getNoteData();
    }, [router.isReady]);

    return (
        <>
            <Typography.Title style={{ margin: "70px 0", textAlign: "center" }}>
                Edit Note
            </Typography.Title>

            {noteInfo.error ? (
                <Alert
                    message="Error"
                    showIcon
                    description={noteInfo.errorMessage}
                    type="error"
                    action={
                        <Button
                            size="small"
                            danger
                            onClick={() => router.push("/", "/")}
                        >
                            Go back
                        </Button>
                    }
                />
            ) : noteInfo.loading ? (
                <>
                    <Skeleton loading={noteInfo.loading} active>
                        <NoteForm />
                    </Skeleton>
                    <Typography.Title level={3}>
                        Loading... <LoadingOutlined />
                    </Typography.Title>
                </>
            ) : (
                <NoteForm
                    defaultValues={{
                        title: noteInfo.title,
                        content: noteInfo.content,
                    }}
                    footer={
                        <>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                block
                                loading={noteInfo.loading}
                                style={{ marginBottom: "10px" }}
                            >
                                Apply
                            </Button>

                            <Button
                                type="ghost"
                                danger
                                size="large"
                                block
                                loading={noteInfo.loading}
                                onClick={() => router.push("/", "/")}
                            >
                                Cancel
                            </Button>
                        </>
                    }
                    onFinish={async (form: any) => {
                        const res = await fetch(
                            `http://localhost:3001/notes/${noteId}`,
                            {
                                method: "PUT",
                                mode: "cors",
                                cache: "no-cache",
                                credentials: "same-origin",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                redirect: "follow",
                                referrerPolicy: "no-referrer",
                                body: JSON.stringify({
                                    id: noteId,
                                    createdOn: noteInfo.createdOn,
                                    ...form,
                                }),
                            }
                        );

                        if (res.status === 200 || res.status === 204) {
                            dispatch({
                                type: ActionTypes.EDIT_NOTE,
                                payload: {
                                    id: noteId,
                                    createdOn: noteInfo.createdOn,
                                    ...form,
                                },
                            });
                            message.success(
                                "Note is updated, redirecting to home page..."
                            );
                            setTimeout(() => router.push("/", "/"), 350);
                        }
                    }}
                />
            )}
        </>
    );
};

export default connect((state) => state, null)(EditNote);
