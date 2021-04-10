/* eslint-disable @typescript-eslint/indent */
const apiBase = '/api';

type fetchResult =
  | {
      success: true;
      data: unknown;
    }
  | {
      success: false;
      data: string | null;
    };

const neofetch = async (fetchParams: {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  jsonData?: unknown;
  contentType?: string;
}): Promise<fetchResult> => {
  const defaultParams = {
    method: 'GET',
    contentType: 'application/json',
  };

  const neoParams = { ...defaultParams, ...fetchParams };

  const { url, method, jsonData, contentType } = neoParams;
  const response = await fetch(apiBase + url, {
    method: method,
    body: JSON.stringify(jsonData),
    headers: {
      'Content-Type': contentType,
    },
  });

  if (response.ok) {
    let respJson: unknown;
    try {
      respJson = await response.json();
    } catch (e) {
      respJson = null;
    }

    return {
      success: true,
      data: respJson,
    };
  } else if (response.status == 401) {
    return {
      success: false,
      data: '登录信息已过期, 请重新登录',
    };
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
