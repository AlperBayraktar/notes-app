import {
    Space,
    Card,
    Typography,
    Col,
    Row,
    Button,
    Empty,
    Modal,
    message,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { Note } from "../state/notesReducer";

import { useRouter } from "next/router";
import { Dispatch } from "../state/store";
import ActionTypes from "../state/ActionTypes";

interface ViewNotesProps {
    notes: Array<Note>;
    dispatch: Dispatch;
}

const ViewNotes: FC<ViewNotesProps> = ({ notes, dispatch }) => {
    const router = useRouter();

    useEffect(() => {
        dispatch(async (dispatch, getState) => {
            const response = await fetch("http://localhost:3001/notes", {
                method: "GET",
            });
            const jsonResponse = await response.json();

            dispatch({
                type: ActionTypes.SET_NOTES,
                payload: jsonResponse,
            });
        });
    }, []);

    return (
        <>
            <Typography.Title style={{ margin: "60px 0", textAlign: "center" }}>
                Notes
            </Typography.Title>
            <Space direction="vertical" style={{ display: "flex" }}>
                {/* No notes */}
                {notes?.length == 0 && (
                    <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{
                            height: 250,
                        }}
                        description={
                            <Typography.Title level={3}>
                                There aren't any notes created yet.
                            </Typography.Title>
                        }
                    >
                        <Button
                            type="primary"
                            size="large"
                            onClick={() => router.push("/CreateNote")}
                        >
                            Create Now
                        </Button>
                    </Empty>
                )}

                {/* Display notes */}

                {notes.map((note: Note) => (
                    <div key={note.id}>
                        <Card title={note.title}>
                            <p>{note.content}</p>

                            <Row style={{ width: "100%" }}>
                                <Col style={{ width: "50%" }}>
                                    <Button
                                        type="primary"
                                        style={{ marginRight: "10px" }}
                                        onClick={() =>
                                            router.push(`/EditNote/${note.id}`)
                                        }
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        type="primary"
                                        onClick={async () => {
                                            Modal.confirm({
                                                title: "Do you want to delete this task?",
                                                icon: (
                                                    <ExclamationCircleOutlined />
                                                ),
                                                content:
                                                    "This is irrecoverable",
                                                okText: "Delete",
                                                okType: "danger",
                                                cancelText: "Go Back",
                                                onOk: async () => {
                                                    const res = await fetch(
                                                        `http://localhost:3001/notes/${note.id}`,
                                                        {
                                                            method: "DELETE",
                                                            mode: "cors",
                                                            cache: "no-cache",
                                                            credentials:
                                                                "same-origin",
                                                            redirect: "follow",
                                                            referrerPolicy:
                                                                "no-referrer",
                                                        }
                                                    );
                                                    if (
                                                        res.status === 200 ||
                                                        res.status === 204
                                                    ) {
                                                        dispatch({
                                                            type: ActionTypes.DELETE_NOTE,
                                                            payload: {
                                                                idOfNoteToDelete:
                                                                    note.id,
                                                            },
                                                        });
                                                        message.success(
                                                            `Deleted note: ${note.title}`
                                                        );
                                                    }
                                                },
                                            });
                                        }}
                                        danger
                                    >
                                        Delete
                                    </Button>
                                </Col>

                                <Col style={{ width: "50%" }}>
                                    <p
                                        style={{
                                            marginTop: "5px",
                                            textAlign: "right",
                                        }}
                                    >
                                        {note.createdOn}
                                    </p>
                                </Col>
                            </Row>
                        </Card>
                        <br />
                    </div>
                ))}
            </Space>
            {notes.length !== 0 && (
                <Button
                    type="primary"
                    onClick={() => router.push("/CreateNote")}
                >
                    Create new note
                </Button>
            )}
        </>
    );
};

export default connect((state) => state, null)(ViewNotes);
