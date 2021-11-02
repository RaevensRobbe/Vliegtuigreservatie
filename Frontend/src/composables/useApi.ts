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

export async function get(url:string){
    const res = await fetch(url)
    .then(res => res.json())
    .catch(error => console.error({ error }))
    // console.log(res)
    return res
}