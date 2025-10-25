const checkResponse = async (res: Response) => {
    if (res && res.ok) return res.json();
    const text = await res?.text?.().catch(() => "");
    throw new Error(`Ошибка ${res?.status ?? ""}${text ? `: ${text}` : ""}`);
};

export type SuccessResponse<T> = { success: true } & T;

const checkSuccess = <T>(data: unknown): SuccessResponse<T> => {
    if (typeof data === "object" && data !== null && (data as { success?: boolean }).success) {
        return data as SuccessResponse<T>;
    }
    throw new Error("Ответ не success");
};

const fetchFn: (input: RequestInfo, init?: RequestInit) => Promise<Response> =
    (typeof window !== "undefined" && window.fetch) ||
    (globalThis.fetch as (input: RequestInfo, init?: RequestInit) => Promise<Response>);

export async function request<T = unknown>(
    url: string,
    options?: RequestInit
): Promise<T> {
    const raw = await fetchFn(url, options).then(checkResponse);
    return raw as T;
}

export function requestSuccess<T = unknown>(
    url: string,
    options?: RequestInit
): Promise<SuccessResponse<T>> {
    return fetchFn(url, options)
        .then(checkResponse)
        .then((data) => checkSuccess<T>(data));
}
