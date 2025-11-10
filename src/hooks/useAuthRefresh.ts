import { useCallback } from "react";
import { useAppDispatch } from "../services/store";
import { refreshAccessToken } from '../services/auth/authSlice';
import { RootStore } from '../services/store';
import { useSelector } from "react-redux";

export function useAuthRefresh() {
    const dispatch = useAppDispatch();
    const accessToken = useSelector((state: RootStore) => state.auth.accessToken);
    const refresh = useCallback(async () => {
        try {
            const token = await dispatch(refreshAccessToken()).unwrap();
            return token;
        } catch (e) {
            return null;
        }
    }, [dispatch]);
    return { accessToken, refresh };
}
