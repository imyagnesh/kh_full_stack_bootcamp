class ResponseWrapper {
    constructor(res) {
        this.res = res;
    }

    #handle({data, success_code, fail_code}) {
        if(success_code) {
            return this.res.status(success_code).send({ success: true, data })
        }
        return this.res.status(fail_code).send({ success: false, reason: data })
    }

    ok(data) {
        return this.#handle({ data, success_code: 200 })
    }

    create(data) {
        return this.#handle({ data, success_code: 201 })
    }

    badRequest(data) {
        return this.#handle({ data, fail_code: 400 })
    }

    unauthorized(data) {
        return this.#handle({ data, fail_code: 401 })
    }

    forbidden(data) {
        return this.#handle({ data, fail_code: 403 })
    }

    notFound(data) {
        return this.#handle({ data, fail_code: 404 })
    }

    serverError(data) {
        return this.#handle({ data, fail_code: 404 })
    }
}


module.exports = ResponseWrapper