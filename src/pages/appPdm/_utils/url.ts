export const getApiServerUrl = (): string => {
  return (window as any)?.serverUrl?.apiServerUrl || '';
};

const isDataOrBlobUrl = (url: string): boolean => {
  return url.startsWith('data:') || url.startsWith('blob:');
};

export const isAbsoluteUrl = (url?: string): boolean => {
  if (!url) return false;
  if (isDataOrBlobUrl(url)) return true;
  return /^https?:\/\//i.test(url);
};

export const normalizeToRelativePath = (input?: string): string | undefined => {
  if (!input) return undefined;
  const trimmed = String(input).trim();
  if (!trimmed) return undefined;
  if (isDataOrBlobUrl(trimmed)) return trimmed;

  const apiServerUrl = getApiServerUrl().replace(/\/+$/, '');
  if (apiServerUrl && trimmed.startsWith(apiServerUrl)) {
    const rest = trimmed.slice(apiServerUrl.length);
    if (!rest) return '/';
    return rest.startsWith('/') ? rest : `/${rest}`;
  }

  if (isAbsoluteUrl(trimmed)) {
    try {
      const url = new URL(trimmed);
      const path = `${url.pathname}${url.search}`;
      return path.startsWith('/') ? path : `/${path}`;
    } catch {
      return trimmed;
    }
  }

  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
};

export const toDisplayUrl = (input?: string): string | undefined => {
  if (!input) return undefined;
  const trimmed = String(input).trim();
  if (!trimmed) return undefined;
  if (isAbsoluteUrl(trimmed)) return trimmed;

  // 优先使用 apiServerUrl，如果未配置则使用当前页面的 origin
  let baseUrl = getApiServerUrl().replace(/\/+$/, '');
  if (!baseUrl) {
    // 【BUG修复】当 apiServerUrl 未配置时，使用浏览器当前的 origin 作为基础URL
    baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  }
  if (!baseUrl) return trimmed;

  const relative = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return `${baseUrl}${relative}`;
};

