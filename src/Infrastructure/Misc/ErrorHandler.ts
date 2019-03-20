export function handleError(res, err) {
    res.format({
        html: () => res.render("error.ejs", {error: err}),
        json: () => {
            res.status(err.status);
            res.json(err.message);
        }
    })

}

export function throwOnNull<T>(obj: T, message?):  T {
    if(obj === undefined || obj === null) {
        throw {status: 404, message: "Object not found: " + message ? message:""}
    }
    return obj
}

export function throwNoJSON(req, res) {
    return res.status(406).send('["text/html"]').end()
}
