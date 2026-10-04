export function path(route = '') { return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${route.replace(/^\//, '')}`; }
