const checkResponse = async (res: any) => {
    if (res && res.ok) return res.json();
    const text = await res?.text?.().catch(() => "");
    throw new Error(`Ошибка ${res?.status ?? ""}${text ? `: ${text}` : ""}`);
};

const checkSuccess = <T>(data: any): T & { success: true } => {
    if (data && data.success) return data as T & { success: true };
    throw new Error("Ответ не success");
};

const fetchFn =
    (typeof window !== "undefined" && (window as any).fetch) ||
    ((globalThis as any).fetch as (input: any, init?: any) => Promise<any>);

export const request = async <T>(
    url: string,
    options?: any
): Promise<T & { success: true }> =>
    fetchFn(url, options).then(checkResponse).then(checkSuccess);
