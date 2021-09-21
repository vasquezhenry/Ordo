import { sendSignInLinkToEmail, signInWithEmailLink, User } from '@firebase/auth';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { auth } from '../../services/firebase';

export interface AuthState {
  user: User | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: true,
};
const EMAIL_KEY = 'emailForSignIn';
export const signIn = createAsyncThunk('auth/signIn', async (email: string) => {
  try {
    await sendSignInLinkToEmail(auth, email, {
      url: 'http://localhost:3000/confirm',
      handleCodeInApp: true,
    });

    localStorage.setItem(EMAIL_KEY, email);
  } catch (error) {
    throw error;
  }
});

export const confirm = createAsyncThunk('auth/confirm', async (payload: { email: string; code: string }) => {
  try {
    const res = await signInWithEmailLink(auth, payload.email, payload.code);
    localStorage.removeItem(EMAIL_KEY);
    return res.user;
  } catch (error) {
    throw error;
  }
});

export const signOut = createAsyncThunk('auth/signOut', async () => {
  try {
    await auth.signOut();
  } catch (error) {
    throw error;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state) => {});
    builder.addCase(confirm.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.user = null;
    });
  },
});

export const { setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
