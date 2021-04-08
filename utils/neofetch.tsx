const apiBase = '/api';

const neofetch = async (fetchParams: {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  jsonData: unknown;
  contentType: string;
}): Promise<
  | {
      success: true;
      data: unknown;
    }
  | {
      success: false;
      data: string | null;
    }
> => {
  const { url, method, jsonData, contentType } = fetchParams;
  const response = await fetch(apiBase + url, {
    method: method,
    body: JSON.stringify(jsonData),
    headers: {
      'Content-Type': contentType,
    },
  });

  if (response.ok) {
    return {
      success: true,
      data: await response.json(),
    };
  } else if (response.status == 401) {
    return await neofetch({ url: '/login', ...fetchParams });
  } else if (response.status >= 400 && response.status < 500) {
    return {
      success: false,
      data: await response.text(),
    };
  } else {
    return {
      success: false,
      data: null,
    };
  }
};

export default neofetch;
