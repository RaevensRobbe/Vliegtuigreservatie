export async function post(url: string, data: any, token:any = null) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':  `Bearer ${token}`
    },
    body: JSON.stringify({
      data,
    }),
  })
    .then(res => res.json())
    .catch(error => console.error({ error }))

  return res
}

export async function get(url: string) {
  const res = await fetch(url)
    .then(res => res.json())
    .catch(error => console.error({ error }))

  return res
}

export async function put(url: string, data: any) {
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data,
    }),
  })
    .then(res => res.json())
    .catch(error => console.error({ error }))

  return res
}
