import { createAction, createReducer } from "@reduxjs/toolkit";
import ActionTypes from "./ActionTypes";

interface Note {
    id: number;
    title: string;
    content: string;
    createdOn: string;
}

interface NotesState {
    notes: Array<Note>;
}

interface Action {
    type: string;
    payload: any;
}

const initialState = { notes: [] } as NotesState;

const notesReducer = createReducer(initialState, (builder) => {
    builder.addCase(
        createAction(ActionTypes.NEW_NOTE),
        (state: NotesState, action: Action) => {
            return {
                ...state,
                notes: [...state.notes, action.payload],
            };
        }
    );

    builder.addCase(
        createAction(ActionTypes.SET_NOTES),
        (state: NotesState, action: Action) => {
            return {
                ...state,
                notes: action.payload,
            };
        }
    );

    builder.addCase(
        createAction(ActionTypes.EDIT_NOTE),
        (state: NotesState, action: Action) => {
            // Delete old note
            let editedIndex: number = -1;
            const newNotes: Array<Note> = state.notes.filter(
                (note: Note, index: number) => {
                    const isEdited: boolean = note.id === action.payload.id;

                    if (isEdited) {
                        editedIndex = index;
                    }

                    return isEdited;
                }
            );
            // Insert new one to right place
            newNotes.splice(editedIndex, 0, action.payload);

            return {
                ...state,
                notes: newNotes,
            };
        }
    );

    builder.addCase(
        createAction(ActionTypes.DELETE_NOTE),
        (state: NotesState, action: Action) => {
            return {
                ...state,
                notes: state.notes.filter(
                    (note: Note) => note.id !== action.payload.idOfNoteToDelete
                ),
            };
        }
    );
});

export type { NotesState };
export type { Note };
export default notesReducer;
