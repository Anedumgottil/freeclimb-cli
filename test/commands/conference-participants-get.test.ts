/* WARNING: This file is automatically generated. Please edit the files in the /generation/tests directory. */
import { expect, test } from "@oclif/test"
import { cred } from "../../src/credentials"

const conferenceId = "userInput-conferenceId"
const callId = "userInput-callId"

import { data } from "../../src/commands/data"
import { Environment } from "../../src/environment"

describe("conference-participants:get Data Test", function () {
    const testJson = {
        message: "Response from server",
    }

    const nockServerResponse = `{
  "message": "Response from server"
}`

    test.nock("https://www.freeclimb.com", async (api) =>
        api
            .get(
                `/apiserver/Accounts/${await cred.accountId}/Conferences/${conferenceId}/Participants/${callId}`,
                {}
            )
            .query({})
            .basicAuth({ user: await cred.accountId, pass: await cred.authToken })
            .reply(200, testJson)
    )
        .stdout()
        .command(["conference-participants:get", "userInput-conferenceId", "userInput-callId"])
        .it("Test all required paramaters", async (ctx) => {
            expect(ctx.stdout).to.contain(nockServerResponse)
        })

    const testJsonErrorNoSuggestion = {
        code: 2,
        message: "Method Not Allowed",
        url: "https://docs.freeclimb.com/reference/error-and-warning-dictionary#2",
        details: {},
    }

    const nockServerResponseErrorNoSuggestion = `starting test`

    test.nock("https://www.freeclimb.com", async (api) =>
        api
            .get(
                `/apiserver/Accounts/${await cred.accountId}/Conferences/${conferenceId}/Participants/${callId}`,
                {}
            )
            .query({})
            .basicAuth({ user: await cred.accountId, pass: await cred.authToken })
            .reply(500, testJsonErrorNoSuggestion)
    )
        .stdout()
        .command(["conference-participants:get", "userInput-conferenceId", "userInput-callId"])
        .exit(3)
        .it("Test Freeclimb Api error repsonce is process correctly without a suggestion")

    test.nock("https://user-custom-domain.example.com", async (api) =>
        api
            .get(
                `/apiserver/Accounts/${await cred.accountId}/Conferences/${conferenceId}/Participants/${callId}`,
                {}
            )
            .query({})
            .basicAuth({ user: await cred.accountId, pass: await cred.authToken })
            .reply(200, testJson)
    )
        .stdout()
        .env({ FREECLIMB_CLI_BASE_URL: "https://user-custom-domain.example.com/apiserver" })
        .command(["conference-participants:get", "userInput-conferenceId", "userInput-callId"])
        .it("Sends API requests to the base URL from an environment variable", async (ctx) => {
            expect(ctx.stdout).to.contain(nockServerResponse)
        })

    const testJsonErrorWithSuggestion = {
        code: 50,
        message: "Unauthorized To Make Request",
        url: "https://docs.freeclimb.com/reference/error-and-warning-dictionary#50",
        details: {},
    }

    const nockServerResponseErrorWithSuggestion = `starting test`

    test.nock("https://www.freeclimb.com", async (api) =>
        api
            .get(
                `/apiserver/Accounts/${await cred.accountId}/Conferences/${conferenceId}/Participants/${callId}`,
                {}
            )
            .query({})
            .basicAuth({ user: await cred.accountId, pass: await cred.authToken })
            .reply(500, testJsonErrorWithSuggestion)
    )
        .stdout()
        .command(["conference-participants:get", "userInput-conferenceId", "userInput-callId"])
        .exit(3)
        .it("Test Freeclimb Api error repsonce is process correctly with a suggestion")

    test.stdout()
        .command([
            "conference-participants:get",
            "userInput-conferenceId",
            "userInput-callId",
            "additionalArguments",
        ])
        .exit(2)
        .it("Test parse error gets triggered when there is an additional argument")

    describe("conference-participants:get next flag test", function () {
        test.nock("https://www.freeclimb.com", async (api) =>
            api
                .get(
                    `/apiserver/Accounts/${await cred.accountId}/Conferences/${conferenceId}/Participants/${callId}`,
                    {}
                )
                .query({})
                .basicAuth({ user: await cred.accountId, pass: await cred.authToken })
                .reply(200, testJson)
        )
            .stdout()
            .env({ FREECLIMB_CONFERENCE_PARTICIPANTS_GET_NEXT: undefined })
            .command(["conference-participants:get", "userInput-conferenceId", "userInput-callId"])
            .command([
                "conference-participants:get",
                "userInput-conferenceId",
                "userInput-callId",
                "--next",
            ])
            .exit(3)
            .it("Tests return of Exit Code 3 when flag next is not available")

        const testJsonNext = {
            total: 1,
            start: 0,
            end: 0,
            page: 1,
            numPages: 1,
            pageSize: 100,
            nextPageUri: null,
        }

        const nockServerResponseNext = `== You are on the last page of output. ==`

        const testJsonNext2 = {
            total: 2,
            start: 0,
            end: 0,
            page: 1,
            numPages: 2,
            pageSize: 100,
            nextPageUri: "",
        }

        const nockServerResponseNext2 = `== Currently on page 1. Run this command again with the -n flag to go to the next page. ==`

        test.nock("https://www.freeclimb.com", async (api) =>
            api
                .get(
                    `/apiserver/Accounts/${await cred.accountId}/Conferences/${conferenceId}/Participants/${callId}`
                )
                .query({ cursor: "636f6e666572656e63652d7061727469636970616e74733a676574" })
                .basicAuth({ user: await cred.accountId, pass: await cred.authToken })
                .reply(200, testJsonNext)
        )
            .stdout()
            .env({
                FREECLIMB_CONFERENCE_PARTICIPANTS_GET_NEXT:
                    "636f6e666572656e63652d7061727469636970616e74733a676574",
            })
            .command([
                "conference-participants:get",
                "userInput-conferenceId",
                "userInput-callId",
                "--next",
            ])
            .it(
                "Test flag next works as expected when available with on last page",
                async (ctx) => {
                    expect(ctx.stdout).to.contain(nockServerResponseNext)
                }
            )

        const finalCursor = "freeClimbCLIAutomatedTestCursor"

        before(() => {
            ;(async () => {
                testJsonNext2.nextPageUri = `https://www.freeclimb.com/apiserver/Accounts/${await cred.accountId}/Conferences/${conferenceId}/Participants/${callId}?cursor=${finalCursor}`
            })()
        })
        after(() => {
            const dataDir = data.run([]).then(
                (dataDir) => {
                    const environment = new Environment(dataDir)
                    environment.clearString("FREECLIMB_CONFERENCE_PARTICIPANTS_GET_NEXT")
                },
                (reason) => console.log(reason)
            )
        })
        test.nock("https://www.freeclimb.com", async (api) =>
            api
                .get(
                    `/apiserver/Accounts/${await cred.accountId}/Conferences/${conferenceId}/Participants/${callId}`
                )
                .query({ cursor: "636f6e666572656e63652d7061727469636970616e74733a676574" })
                .basicAuth({ user: await cred.accountId, pass: await cred.authToken })
                .reply(200, testJsonNext2)
        )
            .stdout()
            .env({
                FREECLIMB_CONFERENCE_PARTICIPANTS_GET_NEXT:
                    "636f6e666572656e63652d7061727469636970616e74733a676574",
            })
            .command([
                "conference-participants:get",
                "userInput-conferenceId",
                "userInput-callId",
                "--next",
            ])
            .it(
                "Test flag next works as expected when available with has more pages",
                async (ctx) => {
                    expect(ctx.stdout).to.contain(nockServerResponseNext2)
                }
            )
    })
})

describe("conference-participants:get Status Test", function () {
    const testJsonStatus = ""

    const statusResponse = `Received a success code from FreeClimb. There is no further output.
`

    test.nock("https://www.freeclimb.com", async (api) =>
        api
            .get(
                `/apiserver/Accounts/${await cred.accountId}/Conferences/${conferenceId}/Participants/${callId}`,
                {}
            )
            .query({})
            .basicAuth({ user: await cred.accountId, pass: await cred.authToken })
            .reply(204, testJsonStatus)
    )
        .stdout()
        .command(["conference-participants:get", "userInput-conferenceId", "userInput-callId"])
        .it("Test all required paramaters", async (ctx) => {
            expect(ctx.stdout).to.contain(statusResponse)
        })
})
