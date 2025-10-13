import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { request } from "../../utils/request";
import type { RootStore } from "../store";
import { API_BASE_URL } from '../../constants/api';

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export interface User {
    email: string;
    name: string;
}

interface LoginResponse {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    user: User;
}

interface RegisterResponse {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    user: User;
}

interface RefreshResponse {
    success: boolean;
    accessToken: string;
    refreshToken: string;
}

interface LogoutResponse {
    success: boolean;
    message: string;
}

interface GetUserResponse {
    success: boolean;
    user: User;
}

interface UpdateUserResponse {
    success: boolean;
    user: User;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    accessToken: string | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const stripBearer = (token: string) =>
    token?.startsWith("Bearer ") ? token.replace("Bearer ", "") : token;

const initialState: AuthState = {
    isAuthenticated: Boolean(localStorage.getItem(ACCESS_TOKEN_KEY)),
    user: null,
    accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
    status: "idle",
    error: null,
};

export const loginApi = async (email: string, password: string): Promise<LoginResponse> =>
    request<LoginResponse>(`${API_BASE_URL}auth/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
    });

export const registerApi = async (
    name: string,
    email: string,
    password: string
): Promise<RegisterResponse> =>
    request<RegisterResponse>(`${API_BASE_URL}auth/register`, {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
    });

export const refreshTokenApi = async (refreshToken: string): Promise<RefreshResponse> =>
    request<RefreshResponse>(`${API_BASE_URL}auth/token`, {
        method: "POST",
        body: JSON.stringify({ token: refreshToken }),
        headers: { "Content-Type": "application/json" },
    });

export const logoutApi = async (refreshToken: string): Promise<LogoutResponse> =>
    request<LogoutResponse>(`${API_BASE_URL}auth/logout`, {
        method: "POST",
        body: JSON.stringify({ token: refreshToken }),
        headers: { "Content-Type": "application/json" },
    });

export const getUserApi = async (accessToken: string): Promise<GetUserResponse> =>
    request<GetUserResponse>(`${API_BASE_URL}auth/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
        },
    });

export const updateUserApi = async (
    accessToken: string,
    data: Partial<{ name: string; email: string; password: string }>
): Promise<UpdateUserResponse> =>
    request<UpdateUserResponse>(`${API_BASE_URL}auth/user`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
        },
    });

const getAccess = (state: RootStore) =>
    state.auth.accessToken ?? localStorage.getItem(ACCESS_TOKEN_KEY) ?? null;

export const login = createAsyncThunk<
    { user: User; accessToken: string },
    { email: string; password: string },
    { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
    try {
        const res = await loginApi(email, password);
        const access = stripBearer(res.accessToken);
        localStorage.setItem(ACCESS_TOKEN_KEY, access);
        localStorage.setItem(REFRESH_TOKEN_KEY, res.refreshToken);
        return { user: res.user, accessToken: access };
    } catch (e: any) {
        return rejectWithValue(e?.message || "Ошибка авторизации");
    }
});

export const registerUser = createAsyncThunk<
    { user: User; accessToken: string },
    { name: string; email: string; password: string },
    { rejectValue: string }
>("auth/register", async ({ name, email, password }, { rejectWithValue }) => {
    try {
        const res = await registerApi(name, email, password);
        const access = stripBearer(res.accessToken);
        localStorage.setItem(ACCESS_TOKEN_KEY, access);
        localStorage.setItem(REFRESH_TOKEN_KEY, res.refreshToken);
        return { user: res.user, accessToken: access };
    } catch (e: any) {
        return rejectWithValue(e?.message || "Ошибка регистрации");
    }
});

export const refreshAccessToken = createAsyncThunk<string, void, { rejectValue: string }>(
    "auth/refreshToken",
    async (_, { rejectWithValue }) => {
        try {
            const refresh = localStorage.getItem(REFRESH_TOKEN_KEY);
            if (!refresh) throw new Error("Нет refresh токена");
            const res = await refreshTokenApi(refresh);
            const access = stripBearer(res.accessToken);
            localStorage.setItem(ACCESS_TOKEN_KEY, access);
            localStorage.setItem(REFRESH_TOKEN_KEY, res.refreshToken);
            return access;
        } catch (e: any) {
            return rejectWithValue(e?.message || "Ошибка обновления токена");
        }
    }
);

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        const refresh = localStorage.getItem(REFRESH_TOKEN_KEY);
        try {
            if (!refresh) throw new Error("Нет refresh токена");
            await logoutApi(refresh);
        } catch (e: any) {
            return rejectWithValue(e?.message || "Ошибка выхода");
        } finally {
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);
        }
    }
);

export const fetchCurrentUser = createAsyncThunk<
    User,
    void,
    { state: RootStore; rejectValue: string }
>("auth/fetchUser", async (_, { getState, dispatch, rejectWithValue }) => {
    let access = getAccess(getState());
    if (!access) return rejectWithValue("Нет access токена");

    try {
        const res = await getUserApi(access);
        return res.user;
    } catch (e: any) {
        try {
            access = await dispatch(refreshAccessToken()).unwrap();
            const res = await getUserApi(access);
            return res.user;
        } catch (err: any) {
            return rejectWithValue(err?.message || "Не удалось получить пользователя");
        }
    }
});

export const updateCurrentUser = createAsyncThunk<
    User,
    { name: string; email: string; password?: string },
    { state: RootStore; rejectValue: string }
>("auth/updateUser", async (payload, { getState, dispatch, rejectWithValue }) => {
    let access = getAccess(getState());
    if (!access) return rejectWithValue("Нет access токена");

    try {
        const res = await updateUserApi(access, payload);
        return res.user;
    } catch (e: any) {
        try {
            access = await dispatch(refreshAccessToken()).unwrap();
            const res = await updateUserApi(access, payload);
            return res.user;
        } catch (err: any) {
            return rejectWithValue(err?.message || "Не удалось обновить пользователя");
        }
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.accessToken = null;
            state.status = "idle";
            state.error = null;
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);
        },
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.isAuthenticated = false;
                state.user = null;
                state.accessToken = null;
                state.error = action.payload ?? "Ошибка входа";
            })
            .addCase(registerUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = "failed";
                state.isAuthenticated = false;
                state.user = null;
                state.accessToken = null;
                state.error = action.payload ?? "Ошибка регистрации";
            })
            .addCase(refreshAccessToken.fulfilled, (state, action) => {
                state.accessToken = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(refreshAccessToken.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.user = null;
                state.accessToken = null;
                state.error = action.payload ?? "Сессия истекла";
            })
            .addCase(fetchCurrentUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.status = "failed";
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload ?? "Не удалось загрузить профиль";
            })
            .addCase(updateCurrentUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateCurrentUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(updateCurrentUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ?? "Не удалось сохранить профиль";
            })
            .addCase(logoutUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.status = "idle";
                state.isAuthenticated = false;
                state.user = null;
                state.accessToken = null;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.status = "idle";
                state.isAuthenticated = false;
                state.user = null;
                state.accessToken = null;
                state.error = action.payload ?? null;
            });
    },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;

export const selectAuthStatus = (s: RootStore) => s.auth.status;
export const selectAuthError = (s: RootStore) => s.auth.error;
export const selectIsAuthenticated = (s: RootStore) => s.auth.isAuthenticated;
export const selectAccessToken = (s: RootStore) => s.auth.accessToken;
export const selectUser = (s: RootStore) => s.auth.user;
