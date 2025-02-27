type THttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface IFetcherOptions extends Omit<RequestInit, "method" | "body"> {
    headers?: Record<string, string>;
    params?: Record<string, string>;
    body?: Record<string, unknown>;
}

interface IResponse<TData> {
    message: string;
    data: TData;
}

export async function fetcher<T>(
    path: string,
    method: THttpMethod,
    options?: IFetcherOptions,
): Promise<IResponse<T>> {
    // Normalize path, add the preceding slash
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;

    // Construct query params, if provided any
    const queryParam = options?.params
        ? `?${new URLSearchParams(options.params).toString()}`
        : "";

    // Construct full URI
    const url = `${import.meta.env.DODOLAN_API_BASEURL}${normalizedPath}${queryParam}`;

    // Merge headers with provided custom header, if any
    const headers = {
        "Content-Type": "application/json",
        ...options?.headers,
    };

    // Stringify body
    const { body, ...restOptions } = options || {};

    // Handle fetch data
    const response = await fetch(url, {
        method,
        ...restOptions,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    // Throw error if request failed
    if (!response.ok) {
        throw new Error(
            `An error occured : error ${response.status} / ${response.statusText}`,
        );
    }

    const result = (await response.json()) as IResponse<T>;

    return result;
}
