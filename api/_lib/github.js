const encodePath = (path) => path.split('/').map(encodeURIComponent).join('/');

const buildBaseHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
});

export const decodeBase64ToUtf8 = (base64Value) => {
  return Buffer.from(base64Value, 'base64').toString('utf8');
};

export const encodeUtf8ToBase64 = (value) => {
  return Buffer.from(value, 'utf8').toString('base64');
};

export const encodeBytesToBase64 = (bytes) => {
  return Buffer.from(bytes).toString('base64');
};

const githubRequest = async ({ token, owner, repo, path, branch, method = 'GET', body }) => {
  const query = branch ? `?ref=${encodeURIComponent(branch)}` : '';
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodePath(path)}${method === 'GET' ? query : ''}`;

  const response = await fetch(url, {
    method,
    headers: {
      ...buildBaseHeaders(token),
      ...(method !== 'GET' ? { 'Content-Type': 'application/json' } : {}),
    },
    body: method !== 'GET' ? JSON.stringify(body) : undefined,
  });

  if (response.status === 404) {
    return { notFound: true, data: null, status: response.status };
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub API error (${response.status}) for ${path}: ${text}`);
  }

  const data = await response.json();
  return { notFound: false, data, status: response.status };
};

export const readRepoFile = async ({ token, owner, repo, path, branch }) => {
  const result = await githubRequest({ token, owner, repo, path, branch, method: 'GET' });
  if (result.notFound) {
    return null;
  }

  const contentBase64 = String(result.data.content || '').replace(/\n/g, '');
  return {
    sha: result.data.sha,
    contentBase64,
    contentUtf8: decodeBase64ToUtf8(contentBase64),
  };
};

export const upsertRepoFile = async ({ token, owner, repo, path, branch, message, contentBase64, sha }) => {
  await githubRequest({
    token,
    owner,
    repo,
    path,
    branch,
    method: 'PUT',
    body: {
      message,
      content: contentBase64,
      branch,
      ...(sha ? { sha } : {}),
    },
  });
};

export const readJsonFile = async ({ token, owner, repo, path, branch, fallbackValue }) => {
  const file = await readRepoFile({ token, owner, repo, path, branch });
  if (!file) return { value: fallbackValue, sha: undefined };

  return {
    value: JSON.parse(file.contentUtf8),
    sha: file.sha,
  };
};
