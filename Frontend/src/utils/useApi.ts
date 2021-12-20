export async function post(url: string, data: any, token: any = null) {
  const res = await fetch(`http://localhost:3001/api/v1${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      data,
    }),
  })
    .then(res => res.json())
    .catch(error => console.error({ error }))

  return res
}

export async function get(url: string, token: any = null) {
  const res = await fetch(`http://localhost:3001/api/v1${url}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .catch(error => console.error({ error }))

  return res
}

export async function put(url: string, data: any, token: any = null) {
  const res = await fetch(`http://localhost:3001/api/v1${url}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      data,
    }),
  })
    .then(res => res.json())
    .catch(error => console.error({ error }))

  return res
}

export async function queryGraphql(
  url: string,
  query: string,
  variables?: Object,
) {
  console.log(url)
  console.log(query)
  console.log(variables)
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
    .then(res => res.json())
    .catch(error => console.error({ error }))

  return res.data
}

export async function del(url: string) {
  const res = await fetch(url, {
    method: 'DELETE',
  })
    .then(res => res.json())
    .catch(error => console.error({ error }))

  return res
}
