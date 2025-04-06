export const convertObjectToQueryParams = (params: Record<string, any>): string => {
    return Object.keys(params)
        .map(key => {
            const value = params[key];

            // Convert array to comma-separated values
            if (Array.isArray(value)) {
                return `${encodeURIComponent(key)}=${encodeURIComponent(value.join(','))}`;
            }

            // Convert normal values
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        })
        .join('&');
};

