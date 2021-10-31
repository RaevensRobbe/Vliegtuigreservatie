

export async function post(url:string,data:any) {
    const res = await fetch(url,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data
        }),
    })
    .then(res => res.json())
    .catch(error => console.error({ error }))
}