import { AccessTimeOutlined } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit'
import VocabList from '../list/VocabList';
export const vocabSlice = createSlice({
    name: "vocabs",
    initialState: { value: VocabList },
    reducers: {
        addVocab: (state, action) => {
            console.log(action.payload);
            state.value.push(action.payload);
        },
        deleteVocab: (state, action) => {
            state.value = state.value.filter((vocab) => vocab.id !== action.payload.id);
        },
        updateExampleSentence: (state, action) => {
            state.value.map((vocab) => {
                if (vocab.id === action.payload.id) {
                    vocab.exampleSentence = action.payload.exampleSentence;
                }
            })
        },
        updateRemembered: (state, action) => {
            state.value = state.value.map((vocab) => {
                if (vocab.id === action.payload.id) {
                    return { ...vocab, remembered: !vocab.remembered }
                }
                return vocab
            });
        },
        updateVocab: (state, action) => {
            state.value = state.value.map((vocab) => {
                if (vocab.id === action.payload.id) {
                    return { ...vocab, ...action.payload }
                }
                return vocab;
            })
        }
    }
});

export default vocabSlice.reducer;
export const { addVocab, deleteVocab, updateExampleSentence, updateRemembered, updateVocab } = vocabSlice.actions;