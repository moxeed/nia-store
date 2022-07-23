export const Query = (data: any) => {
    let query = "?"
    let key: keyof typeof data;
    for (key in data) {
        if (data[key])
            query += `${key}=${data[key]}&`
    }

    return query
}